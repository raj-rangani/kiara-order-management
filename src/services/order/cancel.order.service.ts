import { Database } from "../../database";
import { OrderStatus } from "../../generated/prisma";
import { ApiError } from "../../utils/ApiError";

export async function cancelOrder(data: { orderId: number }) {
  const client = Database.get();
  const { orderId } = data;

  return client.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (order.status !== OrderStatus.pending) {
      throw new ApiError(400, "Order cannot be cancelled");
    }

    await Promise.all(
      order.orderItems.map(async (item) => {
        const product = await tx.product.findUnique({
          where: { id: +item.productId },
        });

        await tx.product.update({
          where: { id: product.id },
          data: { stockQuantity: { increment: item.quantity } },
        });
      })
    );

    const cancelledOrder = await tx.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.cancelled },
    });

    return cancelledOrder;
  });
}
