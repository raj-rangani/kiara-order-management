import { PrismaClient } from "../generated/prisma";
import { ApiError } from "../utils/ApiError";

export class Database {
  private static client: PrismaClient | null = null;

  public static async connect(): Promise<PrismaClient> {
    if (this.client === null) {
      const client = new PrismaClient();
      await client.$connect();
      this.client = client;
    }

    return this.client;
  }

  public static get(): PrismaClient {
    if (!this.client) {
      throw new ApiError(400, "Database not connected");
    }

    return this.client;
  }
}
