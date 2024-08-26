// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			EMAIL_SENDER: string;
			DOMAIN: string;
			POSTGRES_HOST: string;
			POSTGRES_DB: string;
			POSTGRES_USER: string;
			POSTGRES_PASSWORD: string;
			RESEND_KEY: string;
			S3_ENDPOINT: string;
			S3_ACCESS_KEY: string;
			S3_SECRET_KEY: string;
			S3_BUCKET: string;
		}
	}
}

export {};
