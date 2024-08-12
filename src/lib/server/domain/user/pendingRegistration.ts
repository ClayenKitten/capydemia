import Repository from "../../db/repository";
import crypto from "crypto";
import { expiresAfter } from "../../util/date";

export class PendingRegistrationRepository extends Repository {
	/**
	 * Creates a new pending registration.
	 *
	 * If email already has a matching pending registration, registration data is replaced.
	 * */
	public async create({
		email,
		code,
		passwordHash,
		expires
	}: PendingRegistration) {
		await this.db
			.insertInto("pendingRegistration")
			.values({ email, code, passwordHash, expires })
			.onConflict(c =>
				c.column("email").doUpdateSet({
					code: eb => eb.ref("excluded.code"),
					expires: eb => eb.ref("excluded.expires"),
					passwordHash: eb => eb.ref("excluded.passwordHash")
				})
			)
			.execute();
	}

	public async findByCode(
		code: string
	): Promise<PendingRegistration | undefined> {
		let record = await this.db
			.selectFrom("pendingRegistration")
			.select(["code", "email", "expires", "passwordHash"])
			.where("code", "=", code)
			.executeTakeFirst();
		if (record === undefined) return undefined;
		return new PendingRegistration(
			record.email,
			record.passwordHash,
			record.code,
			record.expires
		);
	}

	public async delete(code: string) {
		await this.db
			.deleteFrom("pendingRegistration")
			.where("code", "=", code)
			.execute();
	}
}

export class PendingRegistration {
	constructor(
		public email: string,
		public passwordHash: string,
		public code: string = crypto.randomBytes(64).toString("base64url"),
		public expires: Date = expiresAfter(6)
	) {}

	public get expired() {
		return this.expires < new Date();
	}
}
