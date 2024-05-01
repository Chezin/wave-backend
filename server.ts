import express, { Express, Request, Response, NextFunction } from "express";
import logEvents from "./src/middleware/logEvents";
import errorhandler from "./src/middleware/errorHandler";
import userRouter from "./src/routes/api/v1/user";
import cors from "cors";
import corsOptions from "./src/utils/cors";
import authRouter from "./src/routes/api/v1/auth";

const app: Express = express();
const PORT = process.env.PORT || 3500;

app.use((req: Request, _res: Response, next: NextFunction) => {
	logEvents(`${req.method}\t${req.headers}\t${req.url}`, "requestLog.txt");
	console.log(`${req.method}`);
	next();
});

app.use(cors(corsOptions));
app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((_err: Error, req: Request, res: Response, next: NextFunction) => {
	errorhandler;
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
