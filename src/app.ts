import { Express } from "express";
import { errorHandler } from "./middlewares/error.middleware";
import express from "express";

const app: Express = express();
app.use(express.json());

import userRouter from "./routes/user";
import productRouter from "./routes/product";

app.use("/user", userRouter);
app.use("/product", productRouter);

app.use(errorHandler);

export default app;
