import api from "$lib/api";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async event => {
	let lessonContent = await api(event).course.getLessonContent.query({
		lessonId: Number(event.params.lessonId)
	});
	if (!lessonContent.ok) error(401);

	return {
		lessonContent: lessonContent.value
	};
};
