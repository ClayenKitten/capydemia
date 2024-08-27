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
		let result = await api(event).user.profile.confirmEmailChange.mutate({
			code
		});

		if (result.ok) {
			return "Ваша почта успешно изменена!";
		} else if (result.error === "EXPIRED") {
			return "Срок действия ссылки истёк, запросите изменение почты повторно.";
		} else if (result.error === "NOT_FOUND") {
			return "Некорректная ссылка.";
		}
	}
};
