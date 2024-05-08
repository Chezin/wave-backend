import express, { Express } from "express";
import { logger } from "./src/middleware/logEvents";
import cors from "cors";
import corsOptions from "./src/utils/cors";
import userRouter from "./src/routes/api/v1/user";
import authRouter from "./src/routes/api/v1/auth";

const app: Express = express();
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
