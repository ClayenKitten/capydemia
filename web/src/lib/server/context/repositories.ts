import type { Kysely } from "kysely";
import type { DB } from "$lib/server/db/types";
import { UserRepository } from "../domain/user";
import { SessionRepository } from "../domain/user/session";
import { PendingRegistrationRepository } from "../domain/user/pendingRegistration";
import { PasswordRecoveryRepository } from "../domain/user/passwordRecovery";
import { CourseRepository } from "../domain/course";
import { EmailChangeRepository } from "../domain/user/emailChange";
import { AvatarRepository } from "../domain/user/avatar";
import { Client as Minio } from "minio";

export default function createRepositories(db: Kysely<DB>, s3: Minio) {
	return {
		user: new UserRepository(db),
		session: new SessionRepository(db),
		pendingRegistration: new PendingRegistrationRepository(db),
		passwordRecovery: new PasswordRecoveryRepository(db),
		avatar: new AvatarRepository(s3),
		emailChange: new EmailChangeRepository(db),
		course: new CourseRepository(db)
	};
}
export type Repositories = ReturnType<typeof createRepositories>;
