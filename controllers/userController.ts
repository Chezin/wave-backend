import { prisma } from "../database";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const createUser = async (request: Request, response: Response) => {
	try {
		const { email, name, password } = request.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		});

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
		const { id, email, name, password } = request.body;

		await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				name: name,
				email: email,
				password: password,
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
