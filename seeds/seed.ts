import data from "./products/data.json" with { type: "json" };
import database from "../services/database";

const products = data.products;

// for (const product of products) {
//   try {
//     await database.product.create({
//       data: {
//         name: product.name,
//         handle: product.handle,
//         image: product.image,
//         description: product.description,
//         cost: product.cost,
//         price: product.price,
//         unit: product.unit,
//         vendorName: product.vendorName,
//         vendorContact: product.vendorContact,
//         updatedAt: product.updatedAt,
//         availableQty: product.availableQty,
//         collectionId: product.collectionId,
//         units: {
//           createMany: {
//             data: product.units.map((unit) => ({
//               name: unit.name,
//               quantityInBase: unit.quantityInBase,
//               isBase: unit.isBase,
//               defaultValue: unit.defaultValue,
//               variantValue: unit.variantValue,
//               price: unit.price,
//               cost: unit.cost,
//             }))
//           }
//         },
//       },
//     })
//   } catch (e) {
//     console.log(e)
//   }
// }
