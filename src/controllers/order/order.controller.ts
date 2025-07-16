import { OrderStatus } from "../../generated/prisma";
import { cancelOrder } from "../../services/order/cancel.order.service";
import { createOrder } from "../../services/order/create.order.service";
import { getOrder } from "../../services/order/get.order.service";
import { listOrders } from "../../services/order/list.order.service";
import { updateOrder } from "../../services/order/update.order.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createOrderValidator,
  updateOrderValidator,
} from "../../validators/order/order.validators";

export class OrderController {
  public static createOrder = asyncHandler(async (req, res, next) => {
    const body = createOrderValidator.parse(req.body);
    const order = await createOrder(body);
    return res.status(201).send(new ApiResponse(201, order));
  });

  public static updateOrder = asyncHandler(async (req, res, next) => {
    const body = updateOrderValidator.parse(req.body);
    const order = await updateOrder(req.params.id, {
      ...body,
      status: body.status as OrderStatus,
    });

    return res.status(200).send(new ApiResponse(200, order));
  });

  public static listOrders = asyncHandler(async (req, res, next) => {
    const orders = await listOrders({ userId: req.body.userId });
    return res.status(200).send(new ApiResponse(200, orders));
  });

  public static getOrder = asyncHandler(async (req, res, next) => {
    const order = await getOrder({ orderId: req.params.id });
    return res.status(200).send(new ApiResponse(200, order));
  });

  public static cancelOrder = asyncHandler(async (req, res, next) => {
    const order = await cancelOrder({ orderId: +req.params.id });
    return res.status(200).send(new ApiResponse(200, order));
  });
}
