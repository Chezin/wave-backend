import { prisma } from "../database";
import { Request, Response } from "express";

export const createFood = async (request: Request, response: Response) => {
	try {
		const { name, calories, proteins, carbohidrates, fats } = request.body;
		const food = await prisma.food.create({
			data: {
				name,
				calories,
				proteins,
				carbohidrates,
				fats,
			},
		});

		return response.status(201).json(food);
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export const updateFood = async (request: Request, response: Response) => {
	try {
		const { id, name, calories, proteins, carbohidrates, fats } =
			request.body;
		const food = await prisma.food.update({
			where: {
				id: id,
			},
			data: {
				name,
				calories,
				proteins,
				carbohidrates,
				fats,
			},
		});

		return response.json(food);
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export const getPaginatedFood = async (
	request: Request,
	response: Response
) => {
	try {
		const skip: number = parseInt(request.query.skip as string);
		const take: number = parseInt(request.query.take as string);

		const [count, result] = await prisma.$transaction([
			prisma.food.count(),
			prisma.food.findMany({
				skip: skip,
				take: take,
			}),
		]);
		return response.json({ count, result });
	} catch (error) {
		if (error instanceof Error)
			return response.json({ message: error.message });
		else return response.json({ error });
	}
};

export default { createFood, updateFood, getPaginatedFood };
