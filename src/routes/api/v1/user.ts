import express from "express";
import userController from "../../../controllers/userController";

const userRouter = express.Router();

userRouter
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser)
	.put(userController.updateUser)
	.delete(userController.deleteUser);

userRouter.route("/:id").get(userController.getUserById);

export default userRouter;
