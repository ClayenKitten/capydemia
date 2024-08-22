import api from "$lib/api";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async event => {
	let user = await api(event).user.getInfo.query();

	return {
		user
	};
};
