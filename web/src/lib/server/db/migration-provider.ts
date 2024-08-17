import type { Migration, MigrationProvider } from "kysely";

export default class MyMigrationProvider implements MigrationProvider {
	constructor(private migrations: readonly string[]) {}

	async getMigrations(): Promise<Record<string, Migration>> {
		let s = await Promise.all(
			this.migrations.map(async name => [
				name,
				await import(`./migrations/${name}.ts`)
			])
		);
		let migrations = Object.fromEntries(s);
		return migrations;
	}
}
