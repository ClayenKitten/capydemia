import { router } from "../trpc";
import getSessionRouter from "./session";
import { getProfileRouter } from "./profile";
import getAccountRouter from "./account";

export default function getUserRouter() {
	return router({
		/** Account management. */
		account: getAccountRouter(),
		/** Profile management. */
		profile: getProfileRouter(),
		/** Session management. */
		session: getSessionRouter()
	});
}
