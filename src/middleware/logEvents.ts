import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const logEvents = async (message: string, logName: string) => {
	const fsPromises = fs.promises;

	const dateTime = new Date().toLocaleString("en-US", {
		timeZoneName: "short",
	});
	const logItem = `${message}\t${dateTime}\t${uuid()}\n`;

	try {
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
		}

		await fsPromises.appendFile(
			path.join(__dirname, "..", "logs", logName),
			logItem
		);
	} catch (error) {
		console.log(error);
	}
};

export const logger = (req: Request, _res: Response, next: NextFunction) => {
	logEvents(`${req.method}\t${req.url}\t${req.rawHeaders}`, "requestLog.txt");
	next();
};
