import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import * as m from "$lib/models";

export function getProfileRouter() {
	return router({
		/** Returns profile information. */
		getInfo: protectedProcedure
			.input(z.void())
			.output(m.ProfileInfo)
			.query(async ({ ctx }) => {
				let { id, email, firstName, lastName, patronim } = ctx.session.user;
				return { id, email, firstName, lastName, patronim };
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
					ctx.logger.info(`changed password for user ${ctx.session.user.id}`, {
						user: ctx.session.user.id
					});
				else {
					ctx.logger.info(
						`failed password change for user ${ctx.session.user.id}`,
						{
							user: ctx.session.user.id
						}
					);
				}
				return result;
			}),
		/** Requests user's email change. */
		requestEmailChange: protectedProcedure
			.input(z.object({ newEmail: m.Email }))
			.mutation(({ input, ctx }) => {}),
		/** Confirms email change requested by user. */
		confirmEmailChange: protectedProcedure
			.input(z.object({ code: m.Code }))
			.mutation(({ input, ctx }) => {}),
		/** Changes user avatar. */
		changeAvatar: protectedProcedure
			.input(z.object({ newUrl: m.Url }))
			.mutation(({ input, ctx }) => {})
	});
}
