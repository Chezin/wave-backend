import express from "express";
import userController from "../../../controllers/userController";
import { verifyJWT } from "../../../middleware/verifyJWT";

const userRouter = express.Router();

userRouter.get("/getPaginatedUsers", userController.getPaginatedUsers);
userRouter.get("/me", verifyJWT, userController.getUserFromAccessTokenId);

export default userRouter;
