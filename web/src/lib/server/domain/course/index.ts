import DbRepository from "$lib/server/db/repository";
import type { Selectable } from "kysely";
import type { User } from "../user";
import type { Course as CourseModel } from "$lib/server/db/types";
import type Result from "$lib/server/util/result";

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

	private async mapCourse(record: Selectable<CourseModel>): Promise<Course> {
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
