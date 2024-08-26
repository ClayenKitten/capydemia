import DbRepository from "../../db/repository";
import crypto from "crypto";
import { expiresAfter } from "../../util/date";
import type { User } from ".";

export class EmailChangeRepository extends DbRepository {
	/**
	 * Creates a new email change request.
	 *
	 * If email change request for user already created, it is replaced.
	 * */
	public async create({ user, newEmail, code, expires }: EmailChangeRequest) {
		await this.db
			.insertInto("emailChangeRequest")
			.values({ userId: user.id, newEmail, code, expires })
			.onConflict(c =>
				c.column("userId").doUpdateSet({
					newEmail: eb => eb.ref("excluded.newEmail"),
					code: eb => eb.ref("excluded.code"),
					expires: eb => eb.ref("excluded.expires")
				})
			)
			.execute();
	}

	public async get(
		user: User,
		code: string
	): Promise<EmailChangeRequest | undefined> {
		let record = await this.db
			.selectFrom("emailChangeRequest")
			.select(["newEmail", "expires"])
			.where("userId", "=", user.id)
			.where("code", "=", code)
			.executeTakeFirst();
		if (record === undefined) return undefined;
		return new EmailChangeRequest(user, record.newEmail, code, record.expires);
	}

	public async delete(user: User) {
		await this.db
			.deleteFrom("emailChangeRequest")
			.where("userId", "=", user.id)
			.execute();
	}
}

export class EmailChangeRequest {
	constructor(
		public user: User,
		public newEmail: string,
		public code: string = crypto.randomBytes(64).toString("base64url"),
		public expires: Date = expiresAfter(6)
	) {}

	public get expired() {
		return this.expires < new Date();
	}
}
