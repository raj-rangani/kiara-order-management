import z from "zod";

const createOrderValidator = z
  .object({
    date: z.coerce.date(),
    userId: z.number().min(1),
    items: z
      .object({
        productId: z.number().min(1),
        price: z.number().min(1),
        quantity: z.number().min(1),
      })
      .array()
      .min(1),
  })
  .strict();

const updateOrderValidator = z
  .object({
    date: z.coerce.date().optional(),
    status: z.enum(["pending", "shipped", "delivered"]).optional(),
  })
  .strict();

export { createOrderValidator, updateOrderValidator };
