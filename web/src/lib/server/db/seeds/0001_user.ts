import { type Kysely } from "kysely";
import type { DB } from "../types";
import argon2 from "argon2";
import { resetSequence } from "../utils";

export async function seed(db: Kysely<DB>): Promise<void> {
	const tables = ["session", "user"] as const;
	await Promise.all(
		tables.map(async t => {
			await db.deleteFrom(t).execute();
			await resetSequence(db, t);
		})
	);

	await db
		.insertInto("user")
		.values([
			{
				email: "student@capydemia.ru",
				phone: "88005553535",
				firstName: "Котофей",
				lastName: "Пушистовый",
				patronim: "Капибарович",
				passwordHash: await argon2.hash("password")
			},
			{
				email: "teacher@capydemia.ru",
				phone: null,
				firstName: "Капибарий",
				lastName: "Умиротворённый",
				patronim: null,
				passwordHash: await argon2.hash("password")
			}
		])
		.execute();
}
