import express from "express";
import authController from "../../../controllers/authController";
import { verifyJWT } from "../../../middleware/verifyJWT";

const authRouter = express.Router();

authRouter.post("/register", authController.handleRegister);
authRouter.post("/login", authController.handleLogin);
authRouter.post("/refresh", authController.refreshAccessToken);

export default authRouter;
