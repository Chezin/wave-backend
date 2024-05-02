import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyJWT = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		const token = request.headers.authorization?.split(" ")[1];

		if (!token)
			return response.sendStatus(401).json({ message: "Token is empty" });

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

		next();
	} catch (error) {
		console.log(error);
		return response.status(401);
	}
};
