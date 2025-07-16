import { Router } from "express";
import { OrderController } from "../../controllers/order/order.controller";
import { verifyJwt } from "../../middlewares/auth.middleware";

const route: Router = Router();

route.post("/create", verifyJwt(["user"]), OrderController.createOrder);
route.post("/update/:id", verifyJwt(["admin"]), OrderController.updateOrder);
route.post("/list", verifyJwt(["user", "admin"]), OrderController.listOrders);
route.post("/:id", verifyJwt(["admin", "user"]), OrderController.getOrder);
route.post("/cancel/:id", verifyJwt(["user"]), OrderController.cancelOrder);

export default route;
