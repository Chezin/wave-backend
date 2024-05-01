import express, { Express, Request, Response, NextFunction } from "express";
import logEvents from "./src/middleware/logEvents";
import errorhandler from "./src/middleware/errorHandler";
import userRouter from "./src/routes/api/user";
import cors from "cors";
import corsOptions from "./src/utils/cors";
import { verifyJWT } from "./src/middleware/verifyJWT";
import { handleLogin, handleRegister } from "./src/controllers/authController";

const app: Express = express();
const PORT = process.env.PORT || 3500;

app.use((req: Request, _res: Response, next: NextFunction) => {
	logEvents(`${req.method}\t${req.headers}\t${req.url}`, "requestLog.txt");
	console.log(`${req.method}`);
	next();
});

app.use(cors(corsOptions));
app.use(express.json());

app.post("/register", handleRegister);
app.use(verifyJWT);
app.route("/login").post(handleLogin);
app.use("/users", userRouter);

app.use((_err: Error, req: Request, res: Response, next: NextFunction) => {
	errorhandler;
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
