import { Request, Response, NextFunction } from "express";

export const sanitizeFoodItem = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		let foodItem = request.body;

		if (!foodItem.proteins) foodItem.proteins = 0;
		if (!foodItem.carbohidrates) foodItem.carbohidrates = 0;
		if (!foodItem.fats) foodItem.fats = 0;

		foodItem.proteins = parseInt(foodItem.proteins);
		foodItem.carbohidrates = parseInt(foodItem.carbohidrates);
		foodItem.fats = parseInt(foodItem.fats);

		foodItem.calories = (foodItem.proteins + foodItem.carbohidrates) * 4;
		foodItem.calories += foodItem.fats * 9;

		request.body = foodItem;
		next();
	} catch (error) {
		console.log(error);
		if (error instanceof Error)
			return response.status(401).json({ message: error.message });
	}
};
