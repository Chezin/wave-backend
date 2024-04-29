import { v4 as uuid } from "uuid";
import { NextFunction } from "express";
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

export default logEvents;
