import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { tokenCookieName } from "$lib/api";
import * as m from "$lib/models";

export default function getSessionRouter() {
	return router({
		/** Creates new session. */
		login: publicProcedure.input(m.Login).mutation(async opts => {
			let result = await opts.ctx.services.session.login(
				opts.input.email,
				opts.input.password
			);
			if (result.ok) {
				opts.ctx.request.cookies.set(tokenCookieName, result.value.token, {
					secure: true,
					httpOnly: false,
					path: "/",
					maxAge: 7 * 24 * 60 * 60
				});
				return { ok: true };
			} else {
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
