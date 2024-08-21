import api from "$lib/api";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async event => {
	let firstname = await api(event).user.getInfo.query();
	let lastname = await api(event).user.getInfo.query();

	return {
		firstname,
		lastname
	};
};

/*
export const load: PageLoad = async event => {
	let { lesson, module } = await event.parent();
	if (lesson === undefined || module === null) {
		error(404, { message: "Урок не найден" });
	}

	let lessonId = Number(event.params.lessonId);

	let lessonContent = await api(event).course.getLessonContent.query({
		lessonId
	});
	if (!lessonContent.ok) {
		if (lessonContent.error === "NOT_FOUND")
			error(404, { message: "Урок не найден" });
		error(400, { message: "Произошла ошибка" });
	}

	return {
		lessonContent: JSON.parse(lessonContent.value) as OutputData,
		lesson,
		module
	};
};
*/