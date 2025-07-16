import z from "zod";

const signupUserValidator = z
  .object({
    isAdmin: z.boolean().default(false),
    email: z.email().nonempty(),
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .nonempty(),
  })
  .strict();

const loginUserValidator = z
  .object({
    email: z.email().nonempty(),
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .nonempty(),
  })
  .strict();

export { signupUserValidator, loginUserValidator };
