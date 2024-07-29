import createDatabase from "../db";
import createRepositories from "./repositories";
import createServices from "./services";

/** Creates local context for backend, e. g. user session. */
export async function createInnerContext(opts: InnerContextOpts) {
	let db = createDatabase();
	let repositories = createRepositories(db);
	let services = createServices(repositories);
	return { db, services, repositories };
}

export type InnerContext = Awaited<ReturnType<typeof createInnerContext>>;
export type InnerContextOpts = {
	fetch: typeof fetch;
};
