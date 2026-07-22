import { Prisma } from "../../generated/prisma/client";

type Unit = {
  id?: number;
  name: string;
  quantityInBase: number;
  isBase: boolean;
  cost: number;
  price: number;
}

export async function syncUnits({
  tx,
  productId,
  units,
}: {
  tx: Prisma.TransactionClient;
  productId: number;
  units: Unit[]
}) {
  const existingIds = units
    .filter((u) => u.id != null)
    .map((u) => u.id!);

  await tx.unit.deleteMany({
    where: {
      productId,
      id: {
        notIn: existingIds,
      },
    },
  });
  for (const unit of units) {
    await tx.unit.upsert({
      where: {
        id: unit.id,
      },
      update: {
        name: unit.name,
        quantityInBase: unit.quantityInBase,
        isBase: unit.isBase,
        cost: unit.cost,
        price: unit.price,
      },
      create: {
        productId,
        name: unit.name,
        quantityInBase: unit.quantityInBase,
        isBase: unit.isBase,
        cost: unit.cost,
        price: unit.price,

      }
    })

  }
}
