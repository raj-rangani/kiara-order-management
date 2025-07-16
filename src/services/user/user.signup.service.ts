import { Database } from "../../database";
import { ApiError } from "../../utils/ApiError";
import { CreateUserDto } from "./types";
import bcrypt from "bcryptjs";

export async function signupUserService(data: CreateUserDto) {
  const { email, password } = data;
  const client = Database.get();
  const salt = process.env.PASSWORD_SALT;
  const hashedPassword = bcrypt.hashSync(password, salt);

  const userExists = await client.user.findFirst({ where: { email } });
  if (userExists) throw new ApiError(409, "User already exists.");

  const user = await client.user.create({
    data: {
      email,
      password: hashedPassword,
      role: data.isAdmin ? "admin" : "user",
    },
  });

  return user;
}
