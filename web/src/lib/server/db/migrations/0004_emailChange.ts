import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("emailChangeRequest")
		.addColumn("userId", "integer", c => c.primaryKey().references("user.id"))
		.addColumn("code", "text", c => c.unique().notNull())
		.addColumn("newEmail", "text", c => c.notNull())
		.addColumn("expires", "timestamp", c => c.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("emailChangeRequest").ifExists().execute();
}
