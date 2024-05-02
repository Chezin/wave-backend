import express from "express";
import userController from "../../../controllers/userController";
import { verifyJWT } from "../../../middleware/verifyJWT";

const userRouter = express.Router();

userRouter.route("/:id").get(userController.getUserById);
console.log("oier");
userRouter.route("/me").get(verifyJWT, userController.getUserFromAccessTokenId);

userRouter
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser)
	.put(userController.updateUser)
	.delete(userController.deleteUser);

export default userRouter;
