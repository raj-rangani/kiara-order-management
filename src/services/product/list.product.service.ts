import { Database } from "../../database";
import { ListProductDto } from "./types";

export async function listProducts(data: ListProductDto) {
  const client = Database.get();
  const { filters, pagination } = data;

  const products = await client.product.findMany({
    where: {
      productCategoryId: filters?.categoryId ?? undefined,
      price: {
        gte: filters?.price?.gt ?? undefined,
        lte: filters?.price?.lt ?? undefined,
      },
    },
    skip: pagination.limit * pagination.page - pagination.limit,
    take: pagination.limit,
  });

  return products;
}
