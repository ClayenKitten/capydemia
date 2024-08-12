import type { Kysely } from "kysely";
import type { DB } from "$lib/server/db/types";

export default abstract class Repository {
	constructor(protected db: Kysely<DB>) {}
}
