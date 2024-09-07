import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "../context";

const { router, procedure, createCallerFactory } = initTRPC
	.context<Context>()
	.create();

const publicProcedure = procedure.use(opts => {
	opts.ctx.logger.debug("TRPC request", { type: opts.type, path: opts.path });
	return opts.next();
});

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

const teacherProcedure = protectedProcedure.use(opts => {
	if (!opts.ctx.session.user.isTeacher) {
		throw new TRPCError({ code: "FORBIDDEN" });
	}
	return opts.next({
		ctx: {
			...opts.ctx
		}
	});
});

export {
	router,
	publicProcedure,
	protectedProcedure,
	teacherProcedure,
	createCallerFactory
};
