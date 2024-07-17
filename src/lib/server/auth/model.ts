import { Type as t } from "@sinclair/typebox";

export const registerCredentials = t.Object({
	email: t.String({ format: "email" }),
	name: t.String(),
	password: t.String()
});

export const loginCredentials = t.Object({
	name: t.String(),
	password: t.String()
});
