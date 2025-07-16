import { OrderStatus } from "../../generated/prisma";

export interface CreateOrderDto {
  date: Date;
  userId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}

export interface UpdateOrderDto {
  date?: Date;
  status?: OrderStatus;
}
