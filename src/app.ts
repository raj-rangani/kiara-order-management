import { Express } from "express";
import { errorHandler } from "./middlewares/error.middleware";
import express from "express";

const app: Express = express();
app.use(express.json());

import userRouter from "./routes/user";

app.use("/user", userRouter);
app.use(errorHandler);

export default app;
