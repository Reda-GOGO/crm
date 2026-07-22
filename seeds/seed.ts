import pro_data from "./products/data.json" with { type: "json" };
import database from "../services/database";
import col_data from "./collections/data.json" with { type: "json" };

const collections = col_data.collections;
for (const collection of collections) {
  try {
    await database.collection.create({
      data: {
        name: collection.name,
        handle: collection.handle,
        image: collection.image,
        description: collection.description,
        createdAt: collection.createdAt,
        tags: collection.tags,
        updatedAt: collection.updatedAt,
        archived: collection.archived,
      }
    })
  } catch (e) {
    console.log("Error during collection seeding : ", e)
  }

}

const products = pro_data.products;

for (const product of products) {
  try {
    await database.product.create({
      data: {
        name: product.name,
        handle: product.handle,
        image: product.image,
        description: product.description,
        cost: product.cost,
        price: product.price,
        unit: product.unit,
        updatedAt: product.updatedAt,
        availableQty: product.availableQty,
        collectionId: product.collectionId,
        units: {
          createMany: {
            data: product.units.map((unit) => ({
              name: unit.name,
              quantityInBase: unit.quantityInBase,
              isBase: unit.isBase,
              price: unit.price,
              cost: unit.cost,
            }))
          }
        },
      },
    })
  } catch (e) {
    console.log("Error during product seeding : ", e)
  }
}
