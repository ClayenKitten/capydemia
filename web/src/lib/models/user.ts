import { z, type TypeOf } from "zod";
import { Email, Name, Password, Code, Url } from "./common";

export const Registration = z.object({
	email: Email,
	firstName: Name,
	lastName: Name,
	password: Password
});
export type Registration = TypeOf<typeof Registration>;

export const RegistrationConfirmation = z.object({ code: Code });
export type RegistrationConfirmation = TypeOf<typeof RegistrationConfirmation>;

export const Login = z.object({
	email: Email,
	// Don't check minimal password length when logging in.
	password: z.string().min(1).max(128)
});
export type Login = TypeOf<typeof Login>;

export const Recovery = z.object({ email: Email });
export type Recovery = TypeOf<typeof Recovery>;

export const RecoveryConfirmation = z.object({
	code: Code,
	newPassword: Password
});
export type RecoveryConfirmation = TypeOf<typeof RecoveryConfirmation>;

export const ProfileInfo = z.object({
	email: Email,
	firstName: Name,
	lastName: Name,
	patronim: Name.nullable(),
	avatar: z.string(),
	isTeacher: z.boolean()
});
export type ProfileInfo = TypeOf<typeof ProfileInfo>;

export const ChangeProfileInfo = z
	.object({
		firstName: Name,
		lastName: Name,
		patronim: Name.nullable()
	})
	.partial();
export type ChangeProfileInfo = TypeOf<typeof ChangeProfileInfo>;
