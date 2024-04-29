import express, { Express, Request, Response, NextFunction } from "express";
import logEvents from "./middleware/logEvents";
import path from "path";

const app: Express = express();
const PORT = process.env.PORT || 3500;

app.use((req: Request, _res: Response, next: NextFunction) => {
	logEvents(`${req.method}\t${req.headers}\t${req.url}`, "requestLog.txt");
	console.log(`${req.method}`);
	next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req: Request, res: Response) => {
	res.send("hello");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
