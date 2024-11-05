import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "$lib/server/db/types";

const dialect = new PostgresDialect({
	pool: new pg.Pool({
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DB,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		max: 8
	})
});

let dbCache: Kysely<DB> | null = null;
export default async function createDatabase(): Promise<Kysely<DB>> {
	if (dbCache === null) {
		dbCache = new Kysely<DB>({ dialect });
	}
	return dbCache;
}
