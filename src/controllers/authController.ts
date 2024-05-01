import { Request, Response } from "express";
import { prisma } from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: __dirname + "/.env" });

export const handleRegister = async (request: Request, response: Response) => {
	try {
		const { email, name, password } = request.body;

		if (!email || !password) {
			return response
				.sendStatus(400)
				.json({ message: "Username and password are required" });
		}

		const foundUser = await prisma.user.findUnique({
			where: { email: email },
		});
		if (foundUser)
			return response
				.sendStatus(401)
				.json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		});

		const accessToken = jwt.sign(
			{ username: user.email },
			process.env.ACCESS_TOKEN_SECRET!,
			{ expiresIn: "15s" }
		);
		const refreshToken = jwt.sign(
			{ username: user.email },
			process.env.REFRESH_TOKEN_SECRET!,
			{ expiresIn: "1d" }
		);

		return response.status(201).json({ accessToken, refreshToken, user });
	} catch (error) {
		console.log(error);
	}
};

export const handleLogin = async (request: Request, response: Response) => {
	try {
		const { email, password } = request.body;

		if (!email || !password) {
			return response
				.sendStatus(400)
				.json({ message: "Username and password are requestuired" });
		}

		const foundUser = await prisma.user.findUnique({
			where: { email: email },
		});
		if (!foundUser || !foundUser.password || !foundUser.email)
			return response
				.sendStatus(401)
				.json({ message: "Could not find username" });

		const passwordMatches = await bcrypt.compare(
			password,
			foundUser.password
		);
		if (passwordMatches) {
			const accessToken = jwt.sign(
				{ username: foundUser.email },
				process.env.ACCESS_TOKEN_SECRET!,
				{ expiresIn: "15s" }
			);
			const refreshToken = jwt.sign(
				{ username: foundUser.email },
				process.env.REFRESH_TOKEN_SECRET!,
				{ expiresIn: "1d" }
			);

			// response.cookie("jwt", refresponsehToken, {
			// 	httpOnly: true,
			// 	maxAge: 24 * 60 * 60 * 1000,
			// });
			console.log(response);
			return response.json({ accessToken, refreshToken });
		} else {
			return response
				.sendStatus(401)
				.json({ message: "Passwords do not match" });
		}
	} catch (error) {
		console.log(error);
	}
};
