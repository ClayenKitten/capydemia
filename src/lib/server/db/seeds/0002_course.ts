import { sql, type Kysely } from "kysely";
import type { DB } from "../types";
import { resetSequence } from "../utils";

export async function seed(db: Kysely<DB>): Promise<void> {
	const tables = ["lesson", "module", "course"] as const;
	await Promise.all(
		tables.map(async t => {
			await db.deleteFrom(t).execute();
			await resetSequence(db, t);
		})
	);

	await db
		.insertInto("course")
		.values([
			{ title: "Капибаза", description: "Курс о капибарах, базовый уровень" }
		])
		.execute();
	await db
		.insertInto("module")
		.values([
			{ title: "Введение", courseId: 1, order: 1 },
			{ title: "Капибары и культура", courseId: 1, order: 2 },
			{ title: "Капибароводство", courseId: 1, order: 3 },
			{ title: "Капибароводоминация", courseId: 1, order: 4 },
			{
				title:
					"Исследования бб отсутствии смысла жизни без капибар, а также рецепт кокосового молока",
				courseId: 1,
				order: 5
			}
		])
		.execute();

	const content = {
		time: 1723145720,
		blocks: [],
		version: "2.8.1"
	};
	await db
		.insertInto("lesson")
		.values([
			{ moduleId: 1, order: 1, title: "Капибары", content },
			{ moduleId: 2, order: 1, title: "Капибары", content },
			{ moduleId: 3, order: 1, title: "Капибары", content },
			{ moduleId: 4, order: 1, title: "Капибары", content },
			{ moduleId: 5, order: 1, title: "Капибары", content },
			{ moduleId: 5, order: 2, title: "Капибары 2", content }
		])
		.execute();
	await db
		.insertInto("courseEnrollment")
		.values({ userId: 1, courseId: 1 })
		.execute();
}
