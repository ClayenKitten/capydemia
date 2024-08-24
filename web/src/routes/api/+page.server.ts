import { renderTrpcPanel } from "trpc-panel";
import type { PageServerLoad } from "./$types";
import appRouter from "$lib/server/router";

export const load: PageServerLoad = async () => {
	return {
        content: renderTrpcPanel(appRouter, { url: "http://localhost:3000/trpc" })
    };
};
