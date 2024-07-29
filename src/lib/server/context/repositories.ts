import type { Kysely } from "kysely";
import type { DB } from "kysely-codegen";
import { UserRepository } from "../user";
import { SessionRepository } from "../user/session";
import { PendingRegistrationRepository } from "../user/pendingRegistration";
import { PasswordRecoveryRepository } from "../user/passwordRecovery";

export default function createRepositories(db: Kysely<DB>) {
	return {
		user: new UserRepository(db),
		session: new SessionRepository(db),
		pendingRegistration: new PendingRegistrationRepository(db),
		passwordRecovery: new PasswordRecoveryRepository(db)
	};
}
export type Repositories = ReturnType<typeof createRepositories>;
