import type { Kysely } from "kysely";
import type { DB } from "kysely-codegen";

export default abstract class Repository {
	constructor(protected db: Kysely<DB>) {}
}
