import { createProduct } from "../../services/product/create.product.service";
import { listProducts } from "../../services/product/list.product.service";
import { updateProduct } from "../../services/product/update.product.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createProductValidator,
  listProductValidator,
  updateProductValidator,
} from "../../validators/product/product.validator";

export class ProductController {
  public static createProduct = asyncHandler(async (req, res, next) => {
    const body = createProductValidator.parse(req.body);
    const product = await createProduct(body);
    return res.status(201).send(new ApiResponse(200, product));
  });

  public static updateProduct = asyncHandler(async (req, res, next) => {
    const body = updateProductValidator.parse(req.body);
    const product = await updateProduct(+req.params.id, body);
    return res.status(200).send(new ApiResponse(200, product));
  });

  public static listProduct = asyncHandler(async (req, res, next) => {
    const body = listProductValidator.parse(req.body);
    const products = await listProducts(body);
    return res.status(200).send(new ApiResponse(200, products));
  });
}
