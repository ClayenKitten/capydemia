import { z, type TypeOf } from "zod";
import { Id } from "./common";

export const Title = z.string().max(256);
export const Description = z.string().max(4096).nullable();

export const Lesson = z.object({ id: Id, title: Title });
export type Lesson = TypeOf<typeof Lesson>;

export const Module = z.object({
	id: Id,
	title: Title,
	lessons: z.array(Lesson)
});
export type Module = TypeOf<typeof Module>;

export const Course = z.object({
	id: Id,
	title: Title,
	description: Description,
	modules: z.array(Module)
});
export type Course = TypeOf<typeof Course>;

export const CreateCourse = z.object({
	title: Title,
	description: Description
});
export type CreateCourse = TypeOf<typeof CreateCourse>;

export const UpdateLesson = z.object({
	id: Id.nullable().default(null),
	title: Title
});
export type UpdateLesson = TypeOf<typeof UpdateLesson>;

export const UpdateModule = z.object({
	id: Id.nullable().default(null),
	title: Title,
	lessons: z.array(UpdateLesson)
});
export type updateModule = TypeOf<typeof UpdateModule>;

export const UpdateCourse = z.object({
	id: Id,
	title: Title,
	description: Description,
	modules: z.array(UpdateModule)
});
export type UpdateCourse = TypeOf<typeof UpdateCourse>;

export const LessonContent = z.object({
	time: z.number().nonnegative(),
	blocks: z.array(
		z.object({
			id: z.string().max(64),
			type: z.string().max(64),
			data: z.record(z.string(), z.any())
		})
	),
	version: z.string().max(64)
});
export type LessonContent = TypeOf<typeof LessonContent>;

export const UpdateLessonContent = z.object({
	id: Id,
	content: LessonContent
});
export type UpdateLessonContent = TypeOf<typeof UpdateLessonContent>;
