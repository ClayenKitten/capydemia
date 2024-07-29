import pg from "pg";
import { PostgresDialect } from "kysely";
import { defineConfig } from "kysely-ctl";

export default defineConfig({
	dialect: new PostgresDialect({
		pool: new pg.Pool({
			host: process.env.POSTGRES_HOST,
			database: process.env.POSTGRES_DB,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			max: 8
		})
	}),
	migrations: {
		migrationFolder: "./src/lib/server/db/migrations"
	},
	seeds: {
		seedFolder: "./src/lib/server/db/seeds"
	}
});
