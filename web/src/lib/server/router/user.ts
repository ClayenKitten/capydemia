import { protectedProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { tokenCookieName } from "$lib/api";

const testProcedure = publicProcedure.mutation(() => null);

export default function getUserRouter() {
	return router({
		/** Gets user information. */
		getInfo,
		/** Creation of new users. */
		registration: router({
			begin: beginRegistration,
			complete: completeRegistration
		}),
		/** Management of user sessions. */
		session: router({
			/** Creates new session. */
			login,
			/** Terminates current session. */
			logout,
			/** Terminates all sessions except current. */
			logoutAll
		}),
		// // TODO: implement email change
		// /** User email management. */
		// email: router({
		// 	change: router({
		// 		request: /* ... */,
		// 		confirm: /* ... */
		// 	})
		// }),
		/** User password management. */
		password: router({
			/** Changes user password if old one is provided. */
			change: testProcedure,
			/** Password recovery through email. */
			recovery: router({
				/** Sends email with code to recover address. */
				begin: requestRecovery,
				/** Sets new password if recovery code matches. */
				complete: completeRecovery
			})
		})
	});
}

const getInfo = protectedProcedure.input(z.void()).query(async ({ ctx }) => {
	let { id, email } = ctx.session.user;
	return { id, email };
});
const login = publicProcedure
	.input(
		z.object({
			email: z.string().email().max(128),
			password: z.string().max(128)
		})
	)
	.mutation(async opts => {
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
	});
const logout = publicProcedure.input(z.void()).mutation(async ({ ctx }) => {
	ctx.request.cookies.delete(tokenCookieName, { path: "/" });
	if (ctx.session === undefined) {
		return;
	}
	return await ctx.services.session.logout(ctx.session);
});
const logoutAll = protectedProcedure.input(z.void()).mutation(async opts => {
	opts.ctx.request.cookies.delete(tokenCookieName, { path: "/" });
	return await opts.ctx.services.session.logoutAll(opts.ctx.session);
});

const beginRegistration = publicProcedure
	.input(
		z.object({
			email: z.string().email().max(320),
			firstName: z.string().min(1).max(128),
			lastName: z.string().min(1).max(128),
			password: z.string().min(8).max(128)
		})
	)
	.mutation(async ({ ctx, input }) => {
		return await ctx.services.user.register(
			input.email,
			input.firstName,
			input.lastName,
			input.password
		);
	});
const completeRegistration = publicProcedure
	.input(z.object({ code: z.string() }))
	.mutation(async ({ ctx, input }) => {
		return await ctx.services.user.confirmEmail(input.code);
	});

const requestRecovery = publicProcedure
	.input(z.object({ email: z.string().email().max(320) }))
	.mutation(async ({ ctx, input }) => {
		return await ctx.services.passwordRecovery.request(input.email);
	});
const completeRecovery = publicProcedure
	.input(
		z.object({ code: z.string(), newPassword: z.string().min(8).max(128) })
	)
	.mutation(async ({ ctx, input }) => {
		return await ctx.services.passwordRecovery.complete(
			input.code,
			input.newPassword
		);
	});
