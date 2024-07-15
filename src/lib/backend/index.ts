import { Elysia, t } from "elysia";

export const app = new Elysia({ prefix: "/api" })
	.get("/time", () => new Date().toLocaleTimeString(), {
		response: t.String()
	})
	.compile();

export type App = typeof app;
