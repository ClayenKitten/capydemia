import Repository from "../../db/repository";
import { expiresAfter } from "../../util/date";
import crypto from "crypto";
import type PasswordService from "./password";
import { User, type UserRepository } from ".";
import type { SessionRepository } from "./session";
import type EmailService from "../../email";
import { recoverPasswordTemplate } from "../../email/templates";
import type Result from "../../util/result";

export class PasswordRecoveryService {
	constructor(
		private deps: { email: EmailService; password: PasswordService },
		private repos: {
			user: UserRepository;
			session: SessionRepository;
			passwordRecovery: PasswordRecoveryRepository;
		}
	) {}

	public async request(email: string): Promise<Result<void, never>> {
		let user = await this.repos.user.findByEmail(email);
		if (user === undefined) return { ok: true };

		let recovery = new PasswordRecovery(user);
		await this.repos.passwordRecovery.create(recovery);
		await this.deps.email.sendTemplate(email, recoverPasswordTemplate, {
			code: recovery.code
		});
		return { ok: true };
	}

	public async complete(
		code: string,
		newPassword: string
	): Promise<Result<{ user: User }, "NOT_FOUND" | "EXPIRED">> {
		let request = await this.repos.passwordRecovery.findByCode(code);
		if (request === undefined) return { ok: false, error: "NOT_FOUND" };
		if (request.expired) return { ok: false, error: "EXPIRED" };
		await this.repos.passwordRecovery.delete(request.code);

		let passwordHash = await this.deps.password.hash(newPassword);
		await this.repos.user.updatePassword(request.user, passwordHash);
		return { ok: true, value: { user: request.user } };
	}
}

export class PasswordRecoveryRepository extends Repository {
	public async findByCode(code: string): Promise<PasswordRecovery | undefined> {
		let record = await this.db
			.selectFrom("passwordRecovery")
			.innerJoin("user", "passwordRecovery.email", "user.email")
			.select([
				"user.id",
				"user.email",
				"user.passwordHash",
				"user.firstName",
				"user.lastName",
				"passwordRecovery.code",
				"passwordRecovery.expires"
			])
			.where("code", "=", code)
			.executeTakeFirst();
		if (record === undefined) return undefined;
		return new PasswordRecovery(
			new User(
				record.id,
				record.email,
				record.passwordHash,
				record.firstName,
				record.lastName
			),
			record.code,
			record.expires
		);
	}

	public async create({ user, code, expires }: PasswordRecovery) {
		await this.db
			.insertInto("passwordRecovery")
			.values({ email: user.email, code, expires })
			.onConflict(c =>
				c.column("email").doUpdateSet({
					code: eb => eb.ref("excluded.code"),
					expires: eb => eb.ref("excluded.expires")
				})
			)
			.execute();
	}

	public async delete(code: string) {
		await this.db
			.deleteFrom("passwordRecovery")
			.where("code", "=", code)
			.execute();
	}
}

export class PasswordRecovery {
	constructor(
		public user: User,
		public code: string = crypto.randomBytes(64).toString("base64url"),
		public expires: Date = expiresAfter(1)
	) {}

	public get expired() {
		return this.expires < new Date();
	}
}
