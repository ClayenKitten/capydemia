import api from "$lib/api";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async event => {
	let courses = await api(event).course.getEnrolledCourses.query();

	return {
		courses
	};
};
