import { publicProcedure, router } from "./trpc";
import authRouter from "./auth/router";

export const appRouter = router({
	auth: authRouter,
	getTime: publicProcedure.query(async opts => {
		return new Date().toLocaleTimeString();
	})
});

export type AppRouter = typeof appRouter;
