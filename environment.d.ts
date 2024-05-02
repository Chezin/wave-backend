declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ACCESS_TOKEN_SECRET: string;
			REFRESH_TOKEN_SECRET: string;
			DATABASE_URL: string | null;
			DATABASE_URL_UNPOOLED: string | null;
		}
	}
}
export {};
