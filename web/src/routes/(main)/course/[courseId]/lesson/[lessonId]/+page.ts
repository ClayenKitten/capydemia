import api from "$lib/api";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async event => {
	let lessonId = Number(event.params.lessonId);
	let lessonContent = await api(event).course.getLessonContent.query({
		lessonId
	});

	if (!lessonContent.ok) {
		if (lessonContent.error === "NOT_FOUND") {
			error(404, { message: "Урок не найден" });
		}
		error(400, { message: "Произошла ошибка" });
	}

	event.depends("custom:lessonContent");
	return {
		lessonContent: lessonContent.value
	};
};
