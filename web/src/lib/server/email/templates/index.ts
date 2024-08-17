import Template from "$lib/server/util/template";
import { EmailTemplate } from "..";

import register from "./register.hbs?raw";
import alreadyRegistered from "./alreadyRegistered.hbs?raw";
import recoverPassword from "./recoverPassword.hbs?raw";

export const registerTemplate = new EmailTemplate(
	"Регистрация в Capydemia",
	new Template<{ code: string }>(register)
);

export const alreadyRegisteredTemplate = new EmailTemplate(
	"Попытка повторной регистрации в Capydemia",
	new Template(alreadyRegistered)
);

export const recoverPasswordTemplate = new EmailTemplate(
	"Восстановление аккаунта Capydemia",
	new Template<{ code: string }>(recoverPassword)
);
