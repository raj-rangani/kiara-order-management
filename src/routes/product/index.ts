import { Router } from "express";
import { ProductController } from "../../controllers/product/product.controller";
import { verifyJwt } from "../../middlewares/auth.middleware";

const route: Router = Router();

route.post("/create", verifyJwt(["admin"]), ProductController.createProduct);

route.post(
  "/update/:id",
  verifyJwt(["admin"]),
  ProductController.updateProduct
);

route.post(
  "/list",
  verifyJwt(["user", "admin"]),
  ProductController.listProduct
);

export default route;
