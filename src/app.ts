import { Express } from "express";
import { errorHandler } from "./middlewares/error.middleware";
import express from "express";

const app: Express = express();
app.use(express.json());

import userRouter from "./routes/user";
import productRouter from "./routes/product";
import orderRouter from "./routes/order";

app.use("/auth", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.use(errorHandler);

export default app;
