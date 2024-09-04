import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import * as m from "$lib/models";
import type Result from "$lib/server/util/result";

export function getProfileRouter() {
	return router({
		/** Returns profile information. */
		getInfo: protectedProcedure
			.input(z.void())
			.output(m.ProfileInfo)
			.query(async ({ ctx }) => {
				let { id, email, firstName, lastName, patronim } = ctx.session.user;
				let avatar = await ctx.repositories.avatar.downloadURL(
					ctx.session.user
				);
				return { id, email, firstName, lastName, patronim, avatar };
			}),
		/** Changes primary profile information. */
		changeInfo: protectedProcedure
			.input(m.ChangeProfileInfo)
			.mutation(async ({ input, ctx }) => {
				await ctx.repositories.user.update(ctx.session.user.id, input);
				ctx.logger.info("updated primary profile information");
			}),
		/** Changes user password. */
		changePassword: protectedProcedure
			.input(z.object({ oldPassword: m.Password, newPassword: m.Password }))
			.mutation(async ({ input, ctx }) => {
				let result = await ctx.services.user.changePassword(
					ctx.session.user,
					input.oldPassword,
					input.newPassword
				);
				ctx.logger.info(
					result.ok ? "password changed" : "password change failed"
				);
				return result;
			}),
		/** Requests user's email change. */
		requestEmailChange: protectedProcedure
			.input(z.object({ newEmail: m.Email }))
			.mutation(async ({ input, ctx }): Promise<Result<void, "SAME_EMAIL">> => {
				let result = await ctx.services.user.requestEmailChange(
					ctx.session.user,
					input.newEmail
				);
				if (result.ok) {
					ctx.logger.info("email change requested");
					return result;
				} else if (result.error === "TAKEN") {
					ctx.logger.info("email change request failed, email already exist");
					return { ok: true };
				} else if (result.error === "SAME_EMAIL") {
					ctx.logger.info("email change request failed, email is the same");
					return result;
				}
				throw new Error("Unexpected result type");
			}),
		/** Confirms email change requested by user. */
		confirmEmailChange: protectedProcedure
			.input(z.object({ code: m.Code }))
			.mutation(async ({ input, ctx }) => {
				let result = await ctx.services.user.confirmEmailChange(
					ctx.session.user,
					input.code
				);
				if (result.ok)
					ctx.logger.info(result.ok ? "email changed" : "email change failed");
				return result;
			}),
		/** Changes user avatar. */
		changeAvatar: protectedProcedure
			.input(z.object({ newUrl: m.Url }))
			.mutation(({ input, ctx }) => {})
	});
}
