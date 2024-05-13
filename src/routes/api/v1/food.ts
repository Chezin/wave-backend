import express from "express";
import foodController from "../../../controllers/foodController";
import { sanitizeFoodItem } from "../../../middleware/sanitizeFoodItem";

const foodRouter = express.Router();

foodRouter.post("/create", sanitizeFoodItem, foodController.createFood);
foodRouter.post("/update", foodController.updateFood);

export default foodRouter;
