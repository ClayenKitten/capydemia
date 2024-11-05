import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("lesson")
		.alterColumn("content", c => c.setDefault(sql`'{ "blocks": [] }'::jsonb`))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("lesson")
		.alterColumn("content", c => c.dropDefault())
		.execute();
}
