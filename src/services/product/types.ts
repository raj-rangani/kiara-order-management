export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
  stockQuantity: number;
  categoryId: number;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
  stockQuantity?: number;
  categoryId?: number;
}

export interface ListProductDto {
  filters?: { categoryId?: number; price?: { gt: number; lt: number } };
  pagination: { page: number; limit: number };
}
