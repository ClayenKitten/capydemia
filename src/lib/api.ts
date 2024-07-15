import type { App } from "./backend";
import { browser } from "$app/environment";
import { treaty } from "@elysiajs/eden";

const api = (
	browser
		? treaty<App>("localhost:3000")
		: treaty<App>((await import("./backend")).app)
).api;

export default api;
