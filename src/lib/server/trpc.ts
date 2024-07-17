import { initTRPC } from "@trpc/server";

const { router, procedure, createCallerFactory } = initTRPC.create();

export { router, procedure as publicProcedure, createCallerFactory };
