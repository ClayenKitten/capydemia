import createDatabase from "../db";
import createLogger from "../logger";
import createS3 from "../s3";
import createRepositories from "./repositories";
import createServices from "./services";

/** Creates local context for backend, e. g. user session. */
export async function createInnerContext(opts: InnerContextOpts) {
	let [db, s3] = await Promise.all([createDatabase(), createS3()]);
	let logger = createLogger();
	let repositories = createRepositories(db);
	let services = createServices(repositories);
	return { db, s3, logger, services, repositories };
}

export type InnerContext = Awaited<ReturnType<typeof createInnerContext>>;
export type InnerContextOpts = {
	fetch: typeof fetch;
};
