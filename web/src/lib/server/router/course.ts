import * as m from "$lib/models";
import type Result from "../util/result";
import { protectedProcedure, router, teacherProcedure } from "./trpc";
import { z } from "zod";

export default function getCourseRouter() {
	return router({
		/** Gets list of all cources the user is enrolled to. */
		getEnrolledCourses: protectedProcedure
			.input(z.void())
			.query(async ({ ctx }) => {
				return await ctx.services.course.getEnrolledCourses(ctx.session.user);
			}),
		/** Gets specific course if user has access to it. */
		getCourse: protectedProcedure
			.input(z.object({ courseId: m.Id }))
			.query(async ({ ctx, input }) => {
				return await ctx.services.course.getCourse(
					ctx.session.user,
					input.courseId
				);
			}),
		/** Creates new empty course. */
		createCourse: teacherProcedure
			.input(m.CreateCourse)
			.mutation(async ({ ctx, input }) => {
				let course = await ctx.repositories.course.createCourse(input);
				ctx.logger.info("course created", { course: course.id });
				return course;
			}),
		/** Updates course information and structure. Doesn't update lesson contents. */
		updateCourse: teacherProcedure
			.input(m.UpdateCourse)
			.mutation(async ({ ctx, input }) => {
				let course = await ctx.repositories.course.updateCourse(input);
				ctx.logger.info("course updated", { course: input.id });
				return course;
			}),
		/** Gets specific lesson content if user has access to it. */
		getLessonContent: protectedProcedure
			.input(z.object({ lessonId: m.Id }))
			.query(async ({ ctx, input }) => {
				let result = await ctx.services.course.getLessonContent(
					ctx.session.user,
					input.lessonId
				);
				if (!result.ok) return result;
				return {
					ok: true,
					value: JSON.parse(result.value)
				} as Result<m.LessonContent, never>;
			}),
		/** Updates content of the lesson */
		updateLessonContent: teacherProcedure
			.input(m.UpdateLessonContent)
			.mutation(async ({ ctx, input }) => {
				await ctx.repositories.course.updateLessonContent(
					input.id,
					JSON.stringify(input.content)
				);
				ctx.logger.info("lesson updated", { lesson: input.id });
			}),
		/** Deletes course. */
		deleteCourse: teacherProcedure
			.input(z.object({ courseId: m.Id }))
			.mutation(async ({ ctx, input }) => {
				ctx.repositories.course.deleteCourse(input.courseId);
				ctx.logger.info("course deleted", { course: input.courseId });
			})
	});
}
