import express from "express";
import authController from "../../../controllers/authController";
import { verifyJWT } from "../../../middleware/verifyJWT";

const authRouter = express.Router();

authRouter.route("/register").post(authController.handleRegister);
authRouter.route("/login").post(verifyJWT, authController.handleLogin);

export default authRouter;
