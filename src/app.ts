import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";

import userRouter from "./routes/user.route";
import recordRouter from "./routes/record.route";

const app = express();

// Middleware
app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileupload({
		useTempFiles: true,
	})
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10000mb' }));

// Routers
app.use("/user", userRouter);
app.use("/record", recordRouter);

export default app;
