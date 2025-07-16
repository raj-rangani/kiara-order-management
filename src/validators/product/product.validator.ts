import z from "zod";

const createProductValidator = z
  .object({
    name: z.string().nonempty(),
    price: z.number().min(1),
    description: z.string().nonempty(),
    stockQuantity: z.number().min(1),
    categoryId: z.number().min(1),
  })
  .strict();

const updateProductValidator = z
  .object({
    name: z.string().nonempty().optional(),
    price: z.number().min(1).optional(),
    description: z.string().nonempty().optional(),
    stockQuantity: z.number().min(1).optional(),
    categoryId: z.number().min(1).optional(),
  })
  .strict();

const listProductValidator = z
  .object({
    filters: z
      .object({
        categoryId: z.number().optional(),
        price: z
          .object({
            gt: z.number(),
            lt: z.number(),
          })
          .optional(),
      })
      .optional(),
    pagination: z.object({
      page: z.number().min(1),
      limit: z.number().min(1),
    }),
  })
  .strict();

export { createProductValidator, updateProductValidator, listProductValidator };
