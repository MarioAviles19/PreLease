// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { UserRecord } from "firebase-admin/auth";
import { App } from "firebase-admin/app";
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			/**@remarks Gets the user data from a session cookie
			 * @param {string} cookie The session cookie
			 * 
			 * @returns A promise containing an object consisting the record of the provided user as well as the current admin app instance to be used in `.server.js` files.
			 *  `user` property returns `null` when the session cookie either does not exist or is invalid.
			*/
			GetUserFromSession(cookie: string) :  Promise<{user: UserRecord | null, app: App}>;

			/**@remarks From `firebase` docs Creates a new Firebase session cookie with the specified options. 
			 * The created JWT string can be set as a server-side session cookie with a custom cookie policy, and be used for session management. 
			 * The session cookie JWT will have the same payload claims as the provided ID token. 
			 * 
			 * @param {string} token the idToken of a user
			 * 
			 * @returns a response which contains the JWT to be used as a session cookie
			*/
			CreateSessionCookie(token : string) : Promise<string>;
			sessionCookie : string;

			user: UserRecord | null;
			app : App;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
