import express, { Express, Request, Response, NextFunction } from "express";
import logEvents from "./src/middleware/logEvents";
import errorhandler from "./src/middleware/errorHandler";
import userRouter from "./src/routes/api/user";
import path from "path";
import cors from "cors";
import { createUser } from "./src/controllers/userController";
import handleLogin from "./src/controllers/authController";
import { verifyJWT } from "./src/middleware/verifyJWT";

const app: Express = express();
const PORT = process.env.PORT || 3500;

app.use((req: Request, _res: Response, next: NextFunction) => {
	logEvents(`${req.method}\t${req.headers}\t${req.url}`, "requestLog.txt");
	console.log(`${req.method}`);
	next();
});

const whitelist = [
	"http://localhost:3500",
	"http://localhost:5173",
	"http://127.0.0.1:5173",
	"127.0.0.1:5173",
];
const corsOptions = {
	origin: (origin: any, callback: any) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/register", createUser);
app.route("/login").post(handleLogin);
app.use("/users", userRouter);

app.use((_err: Error, req: Request, res: Response, next: NextFunction) => {
	errorhandler;
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
