import { Database } from "../../database";
import { CreateProductDto } from "./types";

export async function createProduct(data: CreateProductDto) {
  const client = Database.get();
  const { name, price, description, stockQuantity, categoryId } = data;

  const product = await client.product.create({
    data: {
      name,
      price,
      description,
      stockQuantity,
      category: { connect: { id: categoryId } },
    },
  });

  return product;
}
