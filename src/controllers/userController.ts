import { prisma } from "../database";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (request: Request, response: Response) => {
	try {
		const { email, firstName, lastName, phoneNumber, password } =
			request.body;
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

		/* 
			This is returning password even though it shouldnt
			ISSUE: https://github.com/prisma/prisma/issues/5042
		*/
		return response.status(201).json(user);
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export const getAllUsers = async (request: Request, response: Response) => {
	try {
		const users = await prisma.user.findMany();
		return response.json(users);
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export const getUserById = async (request: Request, response: Response) => {
	try {
		const userId = request.params.id;
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		return response.json(user);
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export const getUserByEmail = async (request: Request, response: Response) => {
	try {
		const email = request.params.email;
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		return response.json(user);
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export const updateUser = async (request: Request, response: Response) => {
	try {
		const { id, email, firstName, lastName, phoneNumber, password } =
			request.body;

		const hashedPassword = await bcrypt.hash(password, 10);
		await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				email,
				firstName,
				lastName,
				phoneNumber,
				password: hashedPassword,
			},
		});
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export const deleteUser = async (request: Request, response: Response) => {
	try {
		const userId = request.params.id;
		const user = await prisma.user.delete({
			where: {
				id: userId,
			},
		});
		return response.json({
			user,
		});
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export const getUserFromAccessTokenId = async (
	request: Request,
	response: Response
) => {
	try {
		const token = request.headers.authorization!.split(" ")[1];
		const decoded = jwt.decode(token) as JwtPayload;
		console.log("why null", decoded.username);
		const user = await prisma.user.findUnique({
			where: {
				id: decoded.username,
			},
		});
		console.log("user", user);
		return response.json(user);
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export default {
	createUser,
	getAllUsers,
	getUserById,
	getUserByEmail,
	updateUser,
	deleteUser,
	getUserFromAccessTokenId,
};
