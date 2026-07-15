import { Prisma } from "../../generated/prisma/client";

type Unit = {
  id?: number;
  name: string;
  quantityInBase: number;
  isBase: boolean;
  defaultValue: number;
  variantValue: number;
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

  await tx.productUnit.deleteMany({
    where: {
      productId,
      id: {
        notIn: existingIds,
      },
    },
  });
  for (const unit of units) {
    await tx.productUnit.upsert({
      where: {
        id: unit.id,
      },
      update: {
        name: unit.name,
        quantityInBase: unit.quantityInBase,
        isBase: unit.isBase,
        defaultValue: unit.defaultValue,
        variantValue: unit.variantValue,
        cost: unit.cost,
        price: unit.price,
      },
      create: {
        productId,
        name: unit.name,
        quantityInBase: unit.quantityInBase,
        isBase: unit.isBase,
        defaultValue: unit.defaultValue,
        variantValue: unit.variantValue,
        cost: unit.cost,
        price: unit.price,

      }
    })

  }
}
