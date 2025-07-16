import { Database } from "../../database";

export async function getOrder(data: { orderId: string }) {
  const client = Database.get();
  const { orderId } = data;

  const order = await client.order.findUnique({
    where: { id: +orderId },
    include: { orderItems: true },
  });

  return order;
}
