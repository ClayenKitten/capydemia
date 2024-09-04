import type { RequestEvent } from "@sveltejs/kit";
import { createInnerContext, type InnerContext } from "./inner";
import { tokenCookieName } from "$lib/api";

/** Creates global context for backend, e. g. database connection. */
export default async function createContext(request: RequestEvent) {
	if (innerContext === null) {
		innerContext = await createInnerContext({ fetch: request.fetch });
	}

	let token = request.cookies.get(tokenCookieName);
	let session = undefined;
	if (token !== undefined) {
		session = await innerContext.repositories.session.findByToken(token);
		if (session === undefined) token = undefined;
	}

	return {
		...innerContext,
		logger: innerContext.logger.child({ user: session?.user.id }),
		request,
		token,
		session
	};
}
export type Context = Awaited<ReturnType<typeof createContext>>;

let innerContext: InnerContext | null = null;
