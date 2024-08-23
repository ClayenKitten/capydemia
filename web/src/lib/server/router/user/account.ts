import { publicProcedure, router } from "../trpc";
import * as m from "$lib/models";

export default function getAccountRouter() {
	return router({
		/** Begins account registration. */
		register: publicProcedure
			.input(m.Registration)
			.mutation(async ({ ctx, input }) => {
				return await ctx.services.user.register(input);
			}),
		/** Completes account registration by email confirmation. */
		confirmRegistration: publicProcedure
			.input(m.RegistrationConfirmation)
			.mutation(async ({ ctx, input }) => {
				return await ctx.services.user.confirmEmail(input.code);
			}),
		/** Begins account recovery. */
		recover: publicProcedure
			.input(m.Recovery)
			.mutation(async ({ ctx, input }) => {
				return await ctx.services.passwordRecovery.request(input.email);
			}),
		/** Completes account registration via recovery code. */
		confirmRecovery: publicProcedure
			.input(m.RecoveryConfirmation)
			.mutation(async ({ ctx, input }) => {
				return await ctx.services.passwordRecovery.complete(
					input.code,
					input.newPassword
				);
			})
	});
}
