import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Database } from "../../database";
import { ApiError } from "../../utils/ApiError";
import { LoginUserDto } from "./types";

export async function loginUserService(data: LoginUserDto) {
  const { email, password } = data;
  const client = Database.get();

  const user = await client.user.findFirst({ where: { email } });
  if (!user) throw new ApiError(409, "User does not exists.");

  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_KEY);
  return token;
}
