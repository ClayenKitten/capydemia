import appRouter from "$lib/server/router";
import createContext from "$lib/server/context";
import { redirect, type Handle } from "@sveltejs/kit";
import { createTRPCHandle } from "trpc-sveltekit";
import { sequence } from "@sveltejs/kit/hooks";
import { tokenCookieName } from "$lib/api";

const authorizationHandle: Handle = async ({ event, resolve }) => {
	let pathname = event.url.pathname;
	let token = event.cookies.get(tokenCookieName);
	if (pathname.startsWith("/auth") && token) {
		redirect(307, "/");
	} else if (!pathname.startsWith("/auth") && !token) {
		redirect(307, "/auth/sign_in");
	}

	const response = await resolve(event);
	return response;
};

export const handle: Handle = sequence(
	createTRPCHandle({
		router: appRouter,
		createContext
	}),
	authorizationHandle
);