import { browser } from "$app/environment";
import type { AppRouter } from "$lib/server";
import { createTRPCClient, type TRPCClientInit } from "trpc-sveltekit";

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

export default function api(init?: TRPCClientInit) {
	if (browser && browserClient) return browserClient;
	const client = createTRPCClient<AppRouter>({ init });
	if (browser) browserClient = client;
	return client;
}

export const tokenCookieName = "capydemiaToken";
