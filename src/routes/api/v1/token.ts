import express from "express";
import refreshTokenController from "../../../controllers/refreshTokenController";
import { verifyJWT } from "../../../middleware/verifyJWT";

const tokenRouter = express.Router();

export default tokenRouter;
