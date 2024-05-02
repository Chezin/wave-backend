import { Express } from "express-serve-static-core";

declare global {
	declare module "express-serve-static-core" {
		export interface Request {
			user: { id?: string };
		}
	}
}
export {};
