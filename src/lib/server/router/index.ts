import { router } from "./trpc";
import getUserRouter from "./user";

const appRouter = router({
	user: getUserRouter()
});

type AppRouter = typeof appRouter;

export { appRouter as default, type AppRouter };
