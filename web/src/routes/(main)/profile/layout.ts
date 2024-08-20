/*import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async event => {
	let { course } = await event.parent();
	let lessonId = Number(event.params.lessonId);

	let module = course.modules.find(({ lessons }) =>
		lessons.some(({ id }) => id === lessonId)
	);
	let lesson = module?.lessons.find(({ id }) => id === lessonId);

	return {
		module,
		lesson
	};
};
*/
