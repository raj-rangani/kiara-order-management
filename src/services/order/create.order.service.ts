import { Database } from "../../database";
import { CreateOrderDto } from "./types";

export async function createOrder(data: CreateOrderDto) {
  const client = Database.get();
  const { date, userId, items } = data;

  return client.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        date,
        status: "pending",
        user: { connect: { id: +userId } },
        totalPrice: items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        orderItems: {
          createMany: {
            data: items.map((item) => ({
              productId: +item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      },
    });

    await Promise.all(
      items.map(async (item) => {
        const product = await tx.product.findUnique({
          where: { id: +item.productId },
        });

        if (!product.stockQuantity || product.stockQuantity < item.quantity) {
          throw new Error(
            `Insufficient stock for product ID ${item.productId}`
          );
        }

        await tx.product.update({
          where: { id: +item.productId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
      })
    );

    return order;
  });
}
