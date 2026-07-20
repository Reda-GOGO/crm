import express from "express";
import database from "../services/database";
import { clause, parse, rank } from "../utilities";
import { upload } from "../middlewares/upload";
import { Product } from "../generated/prisma/client";

const router = express.Router({
  mergeParams: true,
});

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const { name, description, handle } = req.body;
    const products = JSON.parse(req.body.products ?? "[]")
    const collection = await database.collection.create({
      data: {
        name,
        handle,
        description,
        image: req.file?.filename ? "/uploads/" + req.file.filename : "",
        products: {
          create: products.map((p: Product) => ({
            id: p.id
          }))
        }
      }
    })
    res.status(201).json({ message: "success", collection })
  } catch (e) {
    next(e);
  }
})



router.get("/", async (req, res, next) => {
  try {
    const query = parse(req.query);
    let { where, orderBy, take, skip } = clause(query);

    if (query.search) {
      where = {
        ...where,
        OR: [
          { name: { contains: query.search } },
        ],
      };
    }

    const allItems = await database.collection.count();

    const collections = await database.collection.findMany({
      where,
      orderBy,
      take,
      skip,
      include: { _count: { select: { products: true } } },
    });

    if (query.search) {
      collections.sort((a, b) =>
        rank(a.name, query.search!) - rank(b.name, query.search!)
      );
    }

    res.json({
      items: collections,
      allItems,
      totalItems: collections.length,
      totalPages: Math.ceil(allItems / take),
      currentPage: query.pagination?.page ?? 1,
    });
  } catch (e) {
    next(e);
  }
});


router.get("/:handle", async (req, res, next) => {
  try {
    const collection = await database.collection.findUnique({
      where: {
        handle: req.params.handle,
      },
      include: {
        products: true,
      }
    });
    if (!collection) return res.status(404).json({ error: "Not found" });
    res.json(collection);
  } catch (e) {
    next(e);
  }
});

router.patch("/:handle", upload.single("image"), async (req, res, next) => {
  try {
    const collection = await database.collection.findUnique({
      where: {
        handle: req.params.handle as string,
      },
      include: {
        products: true,
      },
    });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const { name, description, image } = req.body;

    const products: Product[] = JSON.parse(req.body.products ?? "[]");

    const payloadProductIds = products.map(p => p.id);

    const currentProductIds = collection.products.map(p => p.id);

    const productsToRemove = currentProductIds.filter(
      id => !payloadProductIds.includes(id)
    );

    const productsToAdd = payloadProductIds.filter(
      id => !currentProductIds.includes(id)
    );

    await database.$transaction([
      database.collection.update({
        where: {
          id: collection.id,
        },
        data: {
          name,
          description,
          image,
        },
      }),

      database.product.updateMany({
        where: {
          id: {
            in: productsToRemove,
          },
        },
        data: {
          collectionId: null,
        },
      }),

      database.product.updateMany({
        where: {
          id: {
            in: productsToAdd,
          },
        },
        data: {
          collectionId: collection.id,
        },
      }),
    ]);

    res.json({ message: "success" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:handle", async (req, res, next) => {
  try {
    const collection = await database.collection.findUnique({
      where: {
        handle: req.params.handle
      }
    });
    if (!collection) return res.status(404).send({ error: "Not found" });
    await database.collection.update({
      where: {
        id: collection.id,
      },
      data: {
        archived: true,
      }
    });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});
export default router;
