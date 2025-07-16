import { Router } from "express";
import { OrderController } from "../../controllers/order/order.controller";

const route: Router = Router();

route.post("/create", OrderController.createOrder);
route.post("/update/:id", OrderController.updateOrder);
route.post("/list", OrderController.listOrders);
route.post("/:id", OrderController.getOrder);
route.post("/cancel/:id", OrderController.cancelOrder);

export default route;
