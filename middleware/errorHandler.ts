import { NextFunction } from "express";
import logEvents from "./logEvents";

const errorhandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err.stack);
	logEvents(`${err.name}: ${err.message}`, "errorLog.txt");
};

export default errorhandler;
