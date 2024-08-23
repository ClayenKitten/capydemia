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
				let { id, email, firstName, lastName } = ctx.session.user;
				return { id, email, firstName, lastName };
			}),
		/** Changes primary profile information. */
		changeInfo: protectedProcedure
			.input(m.ChangeProfileInfo)
			.mutation(({ input, ctx }) => {}),
		/** Changes user password. */
		changePassword: protectedProcedure
			.input(z.object({ oldPassword: m.Password, newPassword: m.Password }))
			.mutation(({ input, ctx }) => {}),
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
