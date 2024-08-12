import type { Kysely } from "kysely";
import type { DB } from "$lib/server/db/types";
import { UserRepository } from "../domain/user";
import { SessionRepository } from "../domain/user/session";
import { PendingRegistrationRepository } from "../domain/user/pendingRegistration";
import { PasswordRecoveryRepository } from "../domain/user/passwordRecovery";

export default function createRepositories(db: Kysely<DB>) {
	return {
		user: new UserRepository(db),
		session: new SessionRepository(db),
		pendingRegistration: new PendingRegistrationRepository(db),
		passwordRecovery: new PasswordRecoveryRepository(db)
	};
}
export type Repositories = ReturnType<typeof createRepositories>;
