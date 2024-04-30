import { Request, Response } from "express";
import bcrypt, { compare } from "bcrypt";
import { prisma } from "../database";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const handleLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	console.log(email, password);
	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required" });
	}
	const foundUser = await prisma.user.findUnique({ where: { email: email } });
	if (!foundUser || !foundUser.password || !foundUser.email)
		return res.status(401);
	const passwordMatches = await bcrypt.compare(password, foundUser.password);
	if (passwordMatches) {
		if (ACCESS_TOKEN_SECRET) {
			const accessToken = jwt.sign(
				{ username: foundUser.email },
				ACCESS_TOKEN_SECRET,
				{ expiresIn: "15s" }
			);
			res.json({ accessToken });
		}

		if (REFRESH_TOKEN_SECRET) {
			const refreshToken = jwt.sign(
				{ username: foundUser.email },
				REFRESH_TOKEN_SECRET,
				{ expiresIn: "1d" }
			);
			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			});
		}
	} else {
		res.status(401);
	}
};

export default handleLogin;
