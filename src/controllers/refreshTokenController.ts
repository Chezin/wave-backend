import { prisma } from "../database";
import { Request, Response } from "express";

const createRefreshToken = async (request: Request, response: Response) => {
	try {
		const { id, token } = request.params;
		const refreshToken = await prisma.refreshToken.create({
			data: {
				userId: id,
				hashedToken: token,
			},
		});
		return response.status(201).json(refreshToken);
	} catch (error) {
		console.log(error);
	}
};
const deleteRefreshToken = async (request: Request, response: Response) => {
	try {
		const { refreshToken } = request.params;
		await prisma.refreshToken.delete({
			where: {
				hashedToken: refreshToken,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export default {
	createRefreshToken,
	deleteRefreshToken,
};
