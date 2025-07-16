import { Database } from "../../database";
import { UpdateOrderDto } from "./types";

export async function updateOrder(orderId: string, data: UpdateOrderDto) {
  const client = Database.get();
  const { date, status } = data;

  return client.$transaction(async (tx) => {
    const order = await tx.order.update({
      where: { id: +orderId },
      data: { date, status },
    });

    return order;
  });
}
