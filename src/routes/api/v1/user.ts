import express from "express";
import userController from "../../../controllers/userController";
import { verifyJWT } from "../../../middleware/verifyJWT";

const userRouter = express.Router();

userRouter.route("/me").get(verifyJWT, userController.getUserFromAccessTokenId);

export default userRouter;
