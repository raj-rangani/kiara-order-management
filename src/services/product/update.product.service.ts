import { Database } from "../../database";
import { UpdateProductDto } from "./types";

export async function updateProduct(productId: number, data: UpdateProductDto) {
  const client = Database.get();
  const { name, price, description, stockQuantity, categoryId } = data;

  const updatedProduct = await client.product.update({
    where: { id: productId },
    data: {
      name,
      price,
      description,
      stockQuantity,
      category: { connect: { id: categoryId } },
    },
  });

  return updatedProduct;
}
