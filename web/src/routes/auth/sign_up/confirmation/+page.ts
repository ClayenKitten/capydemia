import api from "$lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async event => {
	let code = event.url.searchParams.get("code");
	let message = await getMessageFromCode(code);

	return {
		message
	};

	async function getMessageFromCode(code: string | null) {
		if (code === null) {
			return "Некорректная ссылка.";
		}
		let result = await api(event).user.account.confirmRegistration.mutate({
			code
		});

		if (result.ok) {
			return "Ваша почта успешно подтверждена! Для начала работы перейдите на главную страницу.";
		} else if (result.error === "EXPIRED") {
			return "Срок действия ссылки истёк, пройдите регистрацию заново.";
		} else if (result.error === "NOT_FOUND") {
			return "Некорректная ссылка.";
		}
	}
};
