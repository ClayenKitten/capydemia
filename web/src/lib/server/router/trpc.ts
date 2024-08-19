import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "../context";

const {
	router,
	procedure: publicProcedure,
	createCallerFactory
} = initTRPC.context<Context>().create();

const protectedProcedure = publicProcedure.use(opts => {
	if (!opts.ctx.session) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return opts.next({
		ctx: {
			session: opts.ctx.session
		}
	});
});

export { router, publicProcedure, protectedProcedure, createCallerFactory };
