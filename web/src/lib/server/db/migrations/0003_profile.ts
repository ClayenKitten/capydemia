import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.addColumn("firstName", "text", c => c.notNull().defaultTo(""))
		.addColumn("lastName", "text", c => c.notNull().defaultTo(""))
		.addColumn("patronim", "text")
		.addColumn("phone", "text")
		.addColumn("avatarUrl", "text")
		.execute();
	await db.schema
		.alterTable("user")
		.alterColumn("firstName", c => c.dropDefault())
		.alterColumn("lastName", c => c.dropDefault())
		.execute();

	await db.schema
		.alterTable("pendingRegistration")
		.addColumn("firstName", "text", c => c.notNull().defaultTo(""))
		.addColumn("lastName", "text", c => c.notNull().defaultTo(""))
		.execute();
	await db.schema
		.alterTable("pendingRegistration")
		.alterColumn("firstName", c => c.dropDefault())
		.alterColumn("lastName", c => c.dropDefault())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.dropColumn("firstName")
		.dropColumn("lastName")
		.dropColumn("patronim")
		.dropColumn("phone")
		.dropColumn("avatarUrl")
		.execute();
	await db.schema
		.alterTable("pendingRegistration")
		.dropColumn("firstName")
		.dropColumn("lastName")
		.execute();
}
