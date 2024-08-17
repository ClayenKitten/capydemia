import { router } from "./trpc";
import getCourseRouter from "./course";
import getUserRouter from "./user";

const appRouter = router({
	user: getUserRouter(),
	course: getCourseRouter()
});

type AppRouter = typeof appRouter;

export { appRouter as default, type AppRouter };
