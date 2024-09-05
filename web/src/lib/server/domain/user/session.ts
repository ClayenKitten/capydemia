import { User, UserRepository } from ".";
import DbRepository from "../../db/repository";
import { expiresAfter } from "../../util/date";
import crypto from "crypto";
import type PasswordService from "./password";
import type Result from "../../util/result";

export class SessionService {
	constructor(
		private deps: { password: PasswordService },
		private repos: { user: UserRepository; session: SessionRepository }
	) {}

	public async login(
		email: string,
		password: string
	): Promise<
		Result<
			{ session: Session },
			{ kind: "MISMATCH"; user: User } | { kind: "NOT_FOUND" }
		>
	> {
		let user = await this.repos.user.findByEmail(email);
		if (user === undefined) {
			return { ok: false, error: { kind: "NOT_FOUND" } };
		}

		let matches = await this.deps.password.verify(password, user.passwordHash);
		if (!matches) return { ok: false, error: { kind: "MISMATCH", user } };

		let session = new Session(user);
		await this.repos.session.create(session);
		return { ok: true, value: { session } };
	}

	public async logout(session: Session) {
		await this.repos.session.delete(session);
	}

	public async logoutAll(session: Session) {
		await this.repos.session.deleteAllExceptCurrent(session);
	}
}

export class Session {
	constructor(
		public user: User,
		public token: string = crypto.randomBytes(64).toString("base64url"),
		public expires: Date = expiresAfter(7 * 24)
	) {}

	public get expired() {
		return this.expires < new Date();
	}
}

export class SessionRepository extends DbRepository {
	public async findByToken(token: string): Promise<Session | undefined> {
		let data = await this.db
			.selectFrom("session")
			.where("token", "=", token)
			.innerJoin("user", "user.id", "session.userId")
			.selectAll("user")
			.select(["session.expires"])
			.executeTakeFirst();
		if (data === undefined) return undefined;
		let user = User.fromRecord(data);
		return new Session(user, token, data.expires);
	}

	public async create(session: Session) {
		await this.db
			.insertInto("session")
			.values({
				userId: session.user.id,
				token: session.token,
				expires: session.expires
			})
			.execute();
	}

	/** Deletes session with matching token. */
	public async delete(session: Session) {
		await this.db
			.deleteFrom("session")
			.where("token", "=", session.token)
			.execute();
	}

	/** Deletes all user sessions except current. */
	public async deleteAllExceptCurrent(session: Session) {
		await this.db
			.deleteFrom("session")
			.where("userId", "=", session.user.id)
			.where("token", "<>", session.token)
			.execute();
	}
}
