import Repository from "../../db/repository";
import type EmailService from "../../email";
import {
	alreadyRegisteredTemplate,
	emailChangeAlreadyExistsTemplate,
	emailChangeTemplate,
	registerTemplate
} from "../../email/templates";
import type PasswordService from "./password";
import {
	PendingRegistration,
	type PendingRegistrationRepository
} from "./pendingRegistration";
import type Result from "../../util/result";
import * as m from "$lib/models";
import type { Updateable } from "kysely";
import type { User as UserTable } from "$lib/server/db/types";
import { EmailChangeRequest, type EmailChangeRepository } from "./emailChange";

export class User {
	constructor(
		public id: number,
		public email: string,
		public passwordHash: string,
		public firstName: string,
		public lastName: string,
		public patronim?: string
	) {}
}

export class UserService {
	constructor(
		private deps: { email: EmailService; password: PasswordService },
		private repos: {
			user: UserRepository;
			pendingRegistration: PendingRegistrationRepository;
			emailChange: EmailChangeRepository;
		}
	) {}

	public async register(dto: m.Registration) {
		let user = await this.repos.user.findByEmail(dto.email);
		if (user !== undefined) {
			this.onAlreadyRegistered(dto.email);
			return;
		}
		let passwordHash = await this.deps.password.hash(dto.password);
		let pending = new PendingRegistration(
			dto.email,
			dto.firstName,
			dto.lastName,
			passwordHash
		);
		await this.repos.pendingRegistration.create(pending);
		await this.deps.email.sendTemplate(dto.email, registerTemplate, {
			code: pending.code
		});
	}

	private async onAlreadyRegistered(email: string) {
		await this.deps.email.sendTemplate(email, alreadyRegisteredTemplate, {});
	}

	public async confirmRegistration(
		code: string
	): Promise<Result<{ user: User }, "NOT_FOUND" | "EXPIRED">> {
		let pending = await this.repos.pendingRegistration.findByCode(code);
		if (pending === undefined) return { ok: false, error: "NOT_FOUND" };
		if (pending.expired) return { ok: false, error: "EXPIRED" };
		let user = await this.repos.user.create(
			pending.email,
			pending.firstName,
			pending.lastName,
			pending.passwordHash
		);
		await this.repos.pendingRegistration.delete(code);
		return { ok: true, value: { user } };
	}

	public async requestEmailChange(
		user: User,
		newEmail: string
	): Promise<Result<void, "SAME_EMAIL" | "TAKEN">> {
		if (user.email === newEmail) return { ok: false, error: "SAME_EMAIL" };
		if ((await this.repos.user.findByEmail(newEmail)) !== undefined) {
			this.deps.email.sendTemplate(
				newEmail,
				emailChangeAlreadyExistsTemplate,
				{}
			);
			return { ok: false, error: "TAKEN" };
		}
		let request = new EmailChangeRequest(user, newEmail);
		await this.repos.emailChange.create(request);
		await this.deps.email.sendTemplate(newEmail, emailChangeTemplate, {
			code: request.code
		});
		return { ok: true };
	}

	public async confirmEmailChange(
		user: User,
		code: string
	): Promise<Result<void, "NOT_FOUND" | "EXPIRED">> {
		let request = await this.repos.emailChange.get(user, code);
		if (request === undefined) return { ok: false, error: "NOT_FOUND" };
		if (request.expired) return { ok: false, error: "EXPIRED" };
		await this.repos.emailChange.delete(user);
		await this.repos.user.update(user.id, { email: request.newEmail });
		return { ok: true };
	}

	public async changePassword(
		user: User,
		oldPassword: string,
		newPassword: string
	): Promise<Result<void, "MISMATCH">> {
		let match = await this.deps.password.verify(oldPassword, user.passwordHash);
		if (!match) return { ok: false, error: "MISMATCH" };
		let newPasswordHash = await this.deps.password.hash(newPassword);
		this.repos.user.update(user.id, { passwordHash: newPasswordHash });
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
			record.lastName,
			record.patronim ?? undefined
		);
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
			record.lastName,
			record.patronim ?? undefined
		);
	}

	public async create(
		email: string,
		firstName: string,
		lastName: string,
		passwordHash: string
	): Promise<User> {
		let id = await this.db
			.insertInto("user")
			.values({ email, firstName, lastName, passwordHash })
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return new User(id, email, passwordHash, firstName, lastName);
	}

	public async update(id: number, dto: Updateable<UserTable>) {
		delete dto.id;
		await this.db.updateTable("user").where("id", "=", id).set(dto).execute();
	}
}
