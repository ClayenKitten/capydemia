import { publicProcedure, router } from "../trpc";
import * as m from "$lib/models";

export default function getAccountRouter() {
	return router({
		/** Begins account registration. */
		register: publicProcedure
			.input(m.Registration)
			.mutation(async ({ ctx, input }) => {
				ctx.logger.info(`user began registration with email '${input.email}'`);
				return await ctx.services.user.register(input);
			}),
		/** Completes account registration by email confirmation. */
		confirmRegistration: publicProcedure
			.input(m.RegistrationConfirmation)
			.mutation(async ({ ctx, input }) => {
				let result = await ctx.services.user.confirmRegistration(input.code);
				if (result.ok)
					ctx.logger.info(
						`completed registration of user '${result.value.user.id}'`,
						{ user: result.value.user.id }
					);
				return result;
			}),
		/** Begins account recovery. */
		recover: publicProcedure
			.input(m.Recovery)
			.mutation(async ({ ctx, input }) => {
				let result = await ctx.services.passwordRecovery.request(input.email);
				if (result.ok)
					ctx.logger.info(
						`requested account recovery for email '${input.email}'`
					);
				return result;
			}),
		/** Completes account registration via recovery code. */
		confirmRecovery: publicProcedure
			.input(m.RecoveryConfirmation)
			.mutation(async ({ ctx, input }) => {
				let result = await ctx.services.passwordRecovery.complete(
					input.code,
					input.newPassword
				);
				if (result.ok)
					ctx.logger.info(
						`completed account recovery for user '${result.value.user.id}'`,
						{ user: result.value.user.id }
					);
				return result;
			})
	});
}
