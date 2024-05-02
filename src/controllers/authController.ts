import { Request, Response } from "express";
import { prisma } from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: __dirname + "/.env" });

type TokenType = "ACCESS" | "REFRESH";

const ACCESS = "ACCESS";
const REFRESH = "REFRESH";
const ACCESS_TOKEN_EXPIRATION = "1d";
const REFRESH_TOKEN_EXPIRATION = "1d";

const createToken = (email: string, expiration: string, type: TokenType) => {
	let secret: string | undefined;
	if (type === "ACCESS") secret = process.env.ACCESS_TOKEN_SECRET;
	else secret = process.env.REFRESH_TOKEN_SECRET;

	const token = jwt.sign({ username: email }, secret!, {
		expiresIn: expiration,
	});
	return token;
};

export const handleRegister = async (request: Request, response: Response) => {
	try {
		const { email, firstName, lastName, phoneNumber, password } =
			request.body;

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
				firstName,
				lastName,
				phoneNumber,
				password: hashedPassword,
			},
		});

		const accessToken = createToken(
			user.id,
			ACCESS_TOKEN_EXPIRATION,
			ACCESS
		);
		const refreshToken = createToken(
			user.id,
			REFRESH_TOKEN_EXPIRATION,
			REFRESH
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
				.json({ message: "Username and password are required" });
		}

		const foundUser = await prisma.user.findUnique({
			where: { email: email },
		});

		console.log("found user", foundUser);
		if (!foundUser || !foundUser.password || !foundUser.email)
			return response
				.sendStatus(401)
				.json({ message: "Could not find username" });

		const passwordMatches = await bcrypt.compare(
			password,
			foundUser.password
		);
		if (passwordMatches) {
			const accessToken = createToken(
				email,
				ACCESS_TOKEN_EXPIRATION,
				ACCESS
			);
			const refreshToken = createToken(
				email,
				REFRESH_TOKEN_EXPIRATION,
				REFRESH
			);

			console.log(response);
			return response.json({ refreshToken, accessToken });
		} else {
			return response
				.sendStatus(401)
				.json({ message: "Passwords do not match" });
		}
	} catch (error) {
		console.log(error);
	}
};

export default { handleRegister, handleLogin };
