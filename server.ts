import express, { Express, Request, Response, NextFunction } from "express";
import logEvents from "./middleware/logEvents";
import errorhandler from "./middleware/errorHandler";
import path from "path";
import cors from "cors";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserByEmail,
	getUserById,
	updateUser,
} from "./controllers/userController";
import handleLogin from "./controllers/authController";
import { verifyJWT } from "./middleware/verifyJWT";

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
app.get("/users", getAllUsers);

app.use((_err: Error, req: Request, res: Response, next: NextFunction) => {
	errorhandler;
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
