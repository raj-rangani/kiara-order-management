import { PrismaClient } from "../generated/prisma";

(async () => {
  const client = new PrismaClient();
  await client.$connect();

  await Promise.all([
    client.productCategory.create({
      data: { name: "Electronics", description: "Electronics" },
    }),
    client.productCategory.create({
      data: { name: "Fashion", description: "Fashion" },
    }),
    client.productCategory.create({
      data: { name: "Mobile Devices", description: "Mobile Devices" },
    }),
    client.productCategory.create({
      data: { name: "Agriculture", description: "Agriculture" },
    }),
  ]);
})();
