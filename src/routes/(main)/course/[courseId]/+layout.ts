import api from "$lib/api";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async event => {
	let course = await api(event).course.getCourse.query({
		courseId: Number(event.params.courseId)
	});
	if (!course.ok) error(404, { message: "Курс не найден" });

	return {
		course: course.value
	};
};
