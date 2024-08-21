import Repository from "../../db/repository";
import type EmailService from "../../email";
import {
	alreadyRegisteredTemplate,
	registerTemplate
} from "../../email/templates";
import type PasswordService from "./password";
import {
	PendingRegistration,
	type PendingRegistrationRepository
} from "./pendingRegistration";
import type Result from "../../util/result";

export class User {
	constructor(
		public id: number,
		public email: string,
		public passwordHash: string,
		public firstName: string,
		public lastName: string
	) {}
}

export class UserService {
	constructor(
		private deps: { email: EmailService; password: PasswordService },
		private repos: {
			user: UserRepository;
			pendingRegistration: PendingRegistrationRepository;
		}
	) {}

	public async register(
		email: string,
		firstName: string,
		lastName: string,
		password: string
	) {
		let user = await this.repos.user.findByEmail(email);
		if (user !== undefined) {
			await this.deps.email.sendTemplate(email, alreadyRegisteredTemplate, {});
			return;
		}
		let passwordHash = await this.deps.password.hash(password);
		let pending = new PendingRegistration(
			email,
			firstName,
			lastName,
			passwordHash
		);
		await this.repos.pendingRegistration.create(pending);
		await this.deps.email.sendTemplate(email, registerTemplate, {
			code: pending.code
		});
	}

	public async confirmEmail(
		code: string
	): Promise<Result<void, "NOT_FOUND" | "EXPIRED">> {
		let pending = await this.repos.pendingRegistration.findByCode(code);
		if (pending === undefined) return { ok: false, error: "NOT_FOUND" };
		if (pending.expired) return { ok: false, error: "EXPIRED" };
		await this.repos.user.create(
			pending.email,
			pending.firstName,
			pending.lastName,
			pending.passwordHash
		);
		await this.repos.pendingRegistration.delete(code);
		return { ok: true };
	}
}

export class UserRepository extends Repository {
	public async findById(id: number): Promise<User | undefined> {
		let record = await this.db
			.selectFrom("user")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) return undefined;
		return new User(
			record.id,
			record.email,
			record.passwordHash,
			record.firstName,
			record.lastName
		);
	}

	public async updatePassword(user: User, passwordHash: string) {
		await this.db
			.updateTable("user")
			.where("id", "=", user.id)
			.set({ passwordHash })
			.execute();
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		let record = await this.db
			.selectFrom("user")
			.selectAll()
			.where("email", "=", email)
			.executeTakeFirst();
		if (record === undefined) return undefined;
		return new User(
			record.id,
			record.email,
			record.passwordHash,
			record.firstName,
			record.lastName
		);
	}

	public async create(
		email: string,
		firstName: string,
		lastName: string,
		passwordHash: string
	): Promise<void> {
		await this.db
			.insertInto("user")
			.values({ email, firstName, lastName, passwordHash })
			.execute();
	}
}
