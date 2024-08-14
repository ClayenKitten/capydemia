import { addProp } from "./util";
import type { Repositories } from "./repositories";
import type EmailService from "../email";
import { ResendEmailService } from "../email/resend";
import type PasswordService from "../domain/user/password";
import Argon2PasswordService from "../domain/user/password/argon2";
import { UserService } from "../domain/user";
import { PasswordRecoveryService } from "../domain/user/passwordRecovery";
import { SessionService } from "../domain/user/session";
import CourseService from "../domain/course";

export default function createServices(repos: Repositories) {
	let s = {};
	addProp(
		s,
		"email",
		new ResendEmailService(process.env.RESEND_KEY) as EmailService
	);
	addProp(s, "password", new Argon2PasswordService() as PasswordService);
	addProp(s, "passwordRecovery", new PasswordRecoveryService(s, repos));
	addProp(s, "session", new SessionService(s, repos));
	addProp(s, "user", new UserService(s, repos));
	addProp(s, "course", new CourseService(repos));
	return s;
}
export type Services = ReturnType<typeof createServices>;
