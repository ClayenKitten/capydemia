import { appRouter } from "$lib/server";
import createContext from "$lib/server/context";
import type { Handle } from "@sveltejs/kit";
import { createTRPCHandle } from "trpc-sveltekit";

export const handle: Handle = createTRPCHandle({
	router: appRouter,
	createContext
});
