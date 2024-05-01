import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type JWTResultToken = {
	id: string;
	username: string;
};

function verifyDecodedToken(data: unknown): asserts data is JWTResultToken {
	if (!(data instanceof Object))
		throw new Error("Decoded token error. Token must be an object");
	if (!("id" in data))
		throw new Error('Decoded token error. Missing required field "id"');
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"];
	console.log(authHeader);
	if (!authHeader) return res.sendStatus(401);
	const token = authHeader.split(" ")[1];
	if (process.env.ACCESS_TOKEN_SECRET) {
		const decodedToken: unknown = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET
		);

		verifyDecodedToken(decodedToken);

		console.log(req, "caí aqui");
		next();
	}
};
