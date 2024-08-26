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
			.mutation(({ input, ctx }) => {
				ctx.repositories.user.update(ctx.session.user.id, input);
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
				if (result.ok)
					ctx.logger.info("successful password change", {
						user: ctx.session.user.id
					});
				else {
					ctx.logger.info(`failed password change`, {
						user: ctx.session.user.id
					});
				}
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
					ctx.logger.info("email change requested", {
						user: ctx.session.user.id
					});
					return result;
				} else if (result.error === "TAKEN") {
					ctx.logger.info("email change request failed, email already exist", {
						user: ctx.session.user.id
					});
					return { ok: true };
				} else if (result.error === "SAME_EMAIL") {
					ctx.logger.info("email change request failed, email is the same", {
						user: ctx.session.user.id
					});
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
					ctx.logger.info("email changed", {
						user: ctx.session.user.id
					});
				else
					ctx.logger.info("email change failed", {
						user: ctx.session.user.id
					});
				return result;
			}),
		/** Changes user avatar. */
		changeAvatar: protectedProcedure
			.input(z.object({ newUrl: m.Url }))
			.mutation(({ input, ctx }) => {})
	});
}
