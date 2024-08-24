import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { tokenCookieName } from "$lib/api";
import * as m from "$lib/models";
import type { RequestEvent } from "@sveltejs/kit";

export default function getSessionRouter() {
	return router({
		/** Creates new session. */
		login: publicProcedure.input(m.Login).mutation(async ({ ctx, input }) => {
			let result = await ctx.services.session.login(
				input.email,
				input.password
			);
			if (result.ok) {
				let session = result.value.session;
				setCookie(ctx.request, session.token);
				ctx.logger.info(
					`successful login attempt into account '${session.user.id}'`,
					{ user: session.user.id }
				);
				return { ok: true };
			} else {
				if (result.error.kind === "MISMATCH") {
					let user = result.error.user;
					ctx.logger.info(`failed login attempt into account '${user.id}'`, {
						user: user.id
					});
				} else if (result.error.kind === "NOT_FOUND") {
					ctx.logger.info(
						`failed login attempt into nonexistent account with '${input.email}' email`
					);
				}
				return { ok: false };
			}
		}),
		/** Terminates current session. */
		logout: publicProcedure.input(z.void()).mutation(async ({ ctx }) => {
			ctx.request.cookies.delete(tokenCookieName, { path: "/" });
			if (ctx.session === undefined) {
				return;
			}
			return await ctx.services.session.logout(ctx.session);
		}),
		/** Terminates all user sessions except current. */
		logoutAll: protectedProcedure.input(z.void()).mutation(async opts => {
			opts.ctx.request.cookies.delete(tokenCookieName, { path: "/" });
			return await opts.ctx.services.session.logoutAll(opts.ctx.session);
		})
	});
}

function setCookie(request: RequestEvent, token: string) {
	request.cookies.set(tokenCookieName, token, {
		secure: true,
		httpOnly: false,
		path: "/",
		maxAge: 7 * 24 * 60 * 60
	});
}
