import { sql, type Kysely } from "kysely";
import type { DB } from "../types";
import argon2 from "argon2";

export async function seed(db: Kysely<DB>): Promise<void> {
	await db.deleteFrom("user").execute();
	await sql<void>`ALTER SEQUENCE user_id_seq RESTART WITH 1`.execute(db);

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
