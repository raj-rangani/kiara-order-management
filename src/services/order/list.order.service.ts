import { Database } from "../../database";

export async function listOrders(data: { userId: string }) {
  const client = Database.get();
  const { userId } = data;

  const orders = await client.order.findMany({
    where: { userId: +userId },
    include: { orderItems: true },
  });

  return orders;
}
