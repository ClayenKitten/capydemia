import DbRepository from "$lib/server/db/repository";
import type { Selectable } from "kysely";
import type { User } from "../user";
import type { Course as CourseTable } from "$lib/server/db/types";
import * as m from "$lib/models";
import type Result from "$lib/server/util/result";
import { TRPCError } from "@trpc/server";

export default class CourseService {
	constructor(private repos: { course: CourseRepository }) {}

	public async getCourse(
		user: User,
		courseId: number
	): Promise<Result<Course, "NOT_FOUND">> {
		let course = await this.repos.course.getCourse(courseId);
		if (course === null) return { ok: false, error: "NOT_FOUND" };
		if (!this.repos.course.isEnrolled(user, course))
			return { ok: false, error: "NOT_FOUND" };
		return { ok: true, value: course };
	}

	public async getEnrolledCourses(user: User): Promise<Course[]> {
		return this.repos.course.getEnrolledCourses(user);
	}

	public async getLessonContent(
		user: User,
		lessonId: number
	): Promise<Result<string, "NOT_FOUND">> {
		let course = await this.repos.course.getCourseByLesson(lessonId);
		if (course === null) return { ok: false, error: "NOT_FOUND" };
		if (!this.repos.course.isEnrolled(user, course))
			return { ok: false, error: "NOT_FOUND" };

		let lesson = await this.repos.course.getLessonContent(lessonId);
		if (lesson === null) return { ok: false, error: "NOT_FOUND" };

		return { ok: true, value: lesson };
	}
}

export class CourseRepository extends DbRepository {
	public async getCourse(courseId: number): Promise<Course | null> {
		let record = await this.db
			.selectFrom("course")
			.where("id", "=", courseId)
			.selectAll()
			.executeTakeFirst();
		if (record === undefined) return null;
		return this.mapCourse(record);
	}

	public async createCourse(createCourse: m.CreateCourse): Promise<Course> {
		let { id } = await this.db
			.insertInto("course")
			.values({
				title: createCourse.title,
				description: createCourse.description
			})
			.returning("id")
			.executeTakeFirstOrThrow();
		return new Course(id, createCourse.title, createCourse.description, []);
	}

	public async updateCourse(course: m.UpdateCourse): Promise<Course> {
		return await this.db.transaction().execute(async trx => {
			let result = await trx
				.updateTable("course")
				.set({ title: course.title, description: course.description })
				.where("id", "=", course.id)
				.executeTakeFirst();
			if (result.numUpdatedRows === 0n) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			await deleteMissingModules(course.id, course.modules);
			let modules = await Promise.all(
				course.modules.map((module, i) => updateModule(course.id, module, i))
			);
			return new Course(course.id, course.title, course.description, modules);

			async function deleteMissingModules(
				courseId: number,
				modules: m.updateModule[]
			) {
				if (course.modules.length !== 0) {
					await trx
						.deleteFrom("module")
						.where(
							"id",
							"not in",
							modules.map(({ id }) => id)
						)
						.execute();
				} else {
					await trx
						.deleteFrom("module")
						.where("courseId", "=", courseId)
						.execute();
				}
			}

			async function updateModule(
				courseId: number,
				module: m.updateModule,
				order: number
			): Promise<Module> {
				if (module.id === null) {
					let { id } = await trx
						.insertInto("module")
						.values({ courseId: courseId, title: module.title, order: order })
						.returning("id")
						.executeTakeFirstOrThrow();
					console.log(id);
					module.id = id;
				} else {
					let result = await trx
						.updateTable("module")
						.set({ title: module.title, order: order })
						.where("id", "=", module.id)
						.executeTakeFirst();
					if (result.numUpdatedRows === 0n) {
						throw new TRPCError({ code: "NOT_FOUND" });
					}
				}

				let moduleId = module.id;
				await deleteMissingLessons(moduleId, module.lessons);
				let lessons = await Promise.all(
					module.lessons.map((lesson, i) => updateLesson(moduleId, lesson, i))
				);
				return new Module(moduleId, module.title, lessons);
			}

			async function deleteMissingLessons(
				moduleId: number,
				lessons: m.UpdateLesson[]
			) {
				if (lessons.length !== 0) {
					await trx
						.deleteFrom("lesson")
						.where(
							"id",
							"not in",
							lessons.map(({ id }) => id)
						)
						.execute();
				} else {
					await trx
						.deleteFrom("lesson")
						.where("moduleId", "=", moduleId)
						.execute();
				}
			}

			async function updateLesson(
				moduleId: number,
				lesson: m.UpdateLesson,
				order: number
			) {
				if (lesson.id === null) {
					let { id } = await trx
						.insertInto("lesson")
						.values({ moduleId, title: lesson.title, order, content: {} })
						.returning("id")
						.executeTakeFirstOrThrow();
					lesson.id = id;
				} else {
					let result = await trx
						.updateTable("lesson")
						.set({ title: lesson.title, order })
						.where("id", "=", moduleId)
						.executeTakeFirst();
					if (result.numUpdatedRows === 0n) {
						throw new TRPCError({ code: "NOT_FOUND" });
					}
				}
				return new Lesson(lesson.id, lesson.title);
			}
		});
	}

	public async deleteCourse(courseId: number) {
		await this.db.deleteFrom("course").where("id", "=", courseId).execute();
	}

	public async getEnrolledCourses(user: User): Promise<Course[]> {
		return this.db
			.selectFrom("courseEnrollment")
			.where("userId", "=", user.id)
			.innerJoin("course", "course.id", "courseEnrollment.courseId")
			.selectAll()
			.execute()
			.then(r => Promise.all(r.map(x => this.mapCourse(x))));
	}

	public async isEnrolled(user: User, course: Course): Promise<boolean> {
		return this.db
			.selectFrom("courseEnrollment")
			.where("userId", "=", user.id)
			.where("courseId", "=", course.id)
			.selectAll()
			.executeTakeFirst()
			.then(x => x !== null);
	}

	public async getLessonContent(id: number): Promise<string | null> {
		return await this.db
			.selectFrom("lesson")
			.where("id", "=", id)
			.select("content")
			.executeTakeFirst()
			.then(x => (x ? JSON.stringify(x.content) : null));
	}

	public async updateLessonContent(id: number, content: string): Promise<void> {
		await this.db
			.updateTable("lesson")
			.set({ content })
			.where("id", "=", id)
			.execute();
	}

	public async getCourseByLesson(lessonId: number): Promise<Course | null> {
		let courseRecord = await this.db
			.selectFrom("lesson")
			.where("lesson.id", "=", lessonId)
			.innerJoin("module", "lesson.moduleId", "module.id")
			.innerJoin("course", "module.courseId", "course.id")
			.select(["course.id", "course.title", "course.description"])
			.executeTakeFirst();
		if (courseRecord === undefined) return null;
		return await this.mapCourse(courseRecord);
	}

	private async mapCourse(record: Selectable<CourseTable>): Promise<Course> {
		return new Course(
			record.id,
			record.title,
			record.description,
			await this.getModules(record.id)
		);
	}

	private async getModules(courseId: number) {
		return this.db
			.selectFrom("module")
			.where("courseId", "=", courseId)
			.orderBy("order asc")
			.select(["id", "title"])
			.execute()
			.then(records =>
				Promise.all(
					records.map(
						async ({ id, title }) =>
							new Module(id, title, await this.getLessons(id))
					)
				)
			);
	}

	private async getLessons(moduleId: number): Promise<Lesson[]> {
		return await this.db
			.selectFrom("lesson")
			.where("moduleId", "=", moduleId)
			.orderBy("order asc")
			.select(["id", "title"])
			.execute()
			.then(r => r.map(({ id, title }) => new Lesson(id, title)));
	}
}

export class Course {
	constructor(
		public id: number,
		public title: string,
		public description: string | null,
		public modules: Module[]
	) {}
}

export class Module {
	constructor(
		public id: number,
		public title: string,
		public lessons: Lesson[]
	) {}
}

export class Lesson {
	constructor(
		public id: number,
		public title: string
	) {}
}
