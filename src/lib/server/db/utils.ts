import { sql, type Kysely } from "kysely";
import type { DB } from "./types";

export async function resetSequence(
	db: Kysely<DB>,
	table: string,
	col: string = "id"
) {
	sql<void>`ALTER SEQUENCE IF EXISTS ${sql.id(`${table}_${col}_seq`)} RESTART WITH 1`.execute(
		db
	);
}
