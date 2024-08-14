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
				email: "student@example.com",
				passwordHash: await argon2.hash("qwerty")
			},
			{
				email: "teacher@example.com",
				passwordHash: await argon2.hash("qwerty")
			}
		])
		.execute();
}
