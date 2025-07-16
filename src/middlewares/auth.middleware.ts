import jwt from "jsonwebtoken";
import { Database } from "../database";
import { UserRole } from "../generated/prisma";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const verifyJwt = (roles: UserRole[]) => {
  return asyncHandler(async (req, _res, next) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    try {
      const client = Database.get();
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      const user = await client.user.findFirst({
        where: { id: (decodedToken as any).id },
      });

      if (!user) throw new ApiError(401, "Invalid access token");
      if (roles.includes(user.role) === false) {
        throw new ApiError(
          403,
          "Forbidden: You do not have permission to access this resource"
        );
      }

      next();
    } catch (error) {
      throw new ApiError(401, error.message || "Invalid access token");
    }
  });
};

export { verifyJwt };
