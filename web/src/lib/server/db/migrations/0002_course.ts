import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("course")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("title", "text", c => c.notNull())
		.addColumn("description", "text")
		.execute();
	await db.schema
		.createTable("module")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("courseId", "integer", c =>
			c.references("course.id").notNull().onDelete("cascade")
		)
		.addColumn("order", "integer", c => c.notNull())
		.addColumn("title", "text", c => c.notNull())
		.execute();
	await db.schema
		.createTable("lesson")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("moduleId", "integer", c =>
			c.references("module.id").notNull().onDelete("cascade")
		)
		.addColumn("order", "integer", c => c.notNull())
		.addColumn("title", "text", c => c.notNull())
		.addColumn("content", "jsonb", c => c.notNull())
		.execute();
	await db.schema
		.createTable("courseEnrollment")
		.addColumn("courseId", "integer", c =>
			c.references("course.id").notNull().onDelete("cascade")
		)
		.addColumn("userId", "integer", c =>
			c.references("user.id").notNull().onDelete("cascade")
		)
		.addPrimaryKeyConstraint("courseEnrollment_PK", ["courseId", "userId"])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	const tables = ["courseEnrollment", "lesson", "module", "course"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}
