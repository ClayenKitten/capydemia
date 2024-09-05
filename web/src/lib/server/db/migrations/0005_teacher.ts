import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.addColumn("isTeacher", "boolean", c => c.notNull().defaultTo(false))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable("user").dropColumn("isTeacher").execute();
}
