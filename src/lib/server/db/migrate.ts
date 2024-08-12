import { Migrator, Kysely } from "kysely";
import type { DB } from "$lib/server/db/types";
import MyMigrationProvider from "./migration-provider";

const migrations = ["0001_initial"] as const;

export default async function migrateToLatest(db: Kysely<DB>) {
	const migrator = new Migrator({
		db,
		provider: new MyMigrationProvider(migrations)
	});

	const { error, results } = await migrator.migrateToLatest();

	results?.forEach(it => {
		if (it.status === "Success") {
			console.log(`migration "${it.migrationName}" was executed successfully`);
		} else if (it.status === "Error") {
			console.error(`failed to execute migration "${it.migrationName}"`);
		}
	});

	if (error) {
		console.error("failed to migrate");
		console.error(error);
		process.exit(1);
	}
}
