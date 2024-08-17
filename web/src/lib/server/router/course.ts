import { protectedProcedure, router } from "./trpc";
import { z } from "zod";

export default function getCourseRouter() {
	return router({
		getEnrolledCourses,
		getCourse,
		getLessonContent
	});
}

/** Gets list of all cources the user is enrolled to. */
const getEnrolledCourses = protectedProcedure
	.input(z.void())
	.query(({ ctx }) => ctx.services.course.getEnrolledCourses(ctx.session.user));

/** Gets specific course if user has access to it. */
const getCourse = protectedProcedure
	.input(z.object({ courseId: z.number().int().nonnegative() }))
	.query(({ ctx, input }) =>
		ctx.services.course.getCourse(ctx.session.user, input.courseId)
	);

/** Gets specific lesson content if user has access to it. */
const getLessonContent = protectedProcedure
	.input(z.object({ lessonId: z.number().int().nonnegative() }))
	.query(({ ctx, input }) =>
		ctx.services.course.getLessonContent(ctx.session.user, input.lessonId)
	);
