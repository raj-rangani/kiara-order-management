import { Router } from "express";
import { ProductController } from "../../controllers/product/product.controller";

const route: Router = Router();

route.post("/create", ProductController.createProduct);
route.post("/update/:id", ProductController.updateProduct);
route.post("/list", ProductController.listProduct);

export default route;
