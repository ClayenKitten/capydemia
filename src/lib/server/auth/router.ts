import { wrap } from "@typeschema/typebox";
import { publicProcedure, router } from "../trpc";
import { loginCredentials, registerCredentials } from "./model";

const authRouter = router({
	register: publicProcedure
		.input(wrap(registerCredentials))
		.mutation(async opts => {
			return { ok: true };
		}),
	login: publicProcedure.input(wrap(loginCredentials)).mutation(async opts => {
		return { ok: true };
	})
});

export default authRouter;
