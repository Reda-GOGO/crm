import express from "express";
import database from "../services/database";
import { clause, parse, rank } from "../utilities";
import { Product } from "../generated/prisma/client";
import { upload } from "../middlewares/upload";

const router = express.Router({
  mergeParams: true,
});
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const { name, handle, description, cost, price, unit, availableQty, archived } = req.body
    const units = JSON.parse(req.body.units ?? "[]");
    const product = await database.product.create({
      data: {
        name,
        handle,
        description,
        image: req.file?.filename ? "/uploads/" + req.file.filename : "",
        cost: Number(cost),
        price: Number(price),
        unit,
        availableQty: Number(availableQty ?? 0),
        archived: archived === "true",

        units: {
          create: units.map((unit: any) => ({
            name: unit.name,
            quantityInBase: Number(unit.quantityInBase),
            isBase: unit.isBase === true || unit.isBase === "true",
            defaultValue: Number(unit.defaultValue),
            variantValue: Number(unit.variantValue),
            cost: Number(unit.cost),
            price: Number(unit.price),
          })),
        },
      },

      include: {
        units: true,
      },
    });

    res.status(201).json({ message: "success", product })
  } catch (e) {
    next(e);
  }
});

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

    const allItems = await database.product.count();
    const totalItems = await database.product.count({ where });

    let products: Product[];
    if (query.search) {
      const matches = await database.product.findMany({ where, orderBy });
      matches.sort((a, b) => rank(a.name, query.search!) - rank(b.name, query.search!));
      products = matches.slice(skip, skip + take);
    } else {
      products = await database.product.findMany({ where, orderBy, take, skip });
    }

    res.json({
      items: products,
      allItems,
      totalItems,
      totalPages: Math.ceil(allItems / take),
      currentPage: query.pagination?.page ?? 1,
    });
  } catch (e) {
    next(e);
  }
});


router.get("/:handle", async (req, res, next) => {
  try {
    const product = await database.product.findUnique({
      where: {
        handle: req.params.handle,
      },
      include: {
        Collection: {
          select: {
            name: true,
            handle: true,
          }
        },
        units: true,
      }
    });
    if (!product) return res.status(404).send({ error: "Not found" });
    res.json(product);
  } catch (e) {
    next(e);
  }
});


router.patch("/:handle", upload.single("image"), async (req, res, next) => {
  try {
    const { name, description, cost, price, unit, image, availableQty, archived } = req.body
    const product = await database.product.findUnique({
      where: {
        handle: req.params.handle as string
      }
    });

    if (!product) return res.status(404).send({ error: "Not found" });

    const payload: Partial<Product> = {};

    if (name) payload.name = name;
    if (description) payload.description = description;
    if (cost) payload.cost = Number(cost);
    if (price) payload.price = Number(price);
    if (unit) payload.unit = unit;
    if (archived) payload.archived = Boolean(archived);
    if (availableQty) payload.availableQty = Number(availableQty);
    payload.image = req.file?.filename ? "/uploads/" + req.file.filename : image;

    const units = JSON.parse(req.body.units ?? "[]");



    await database.$transaction(async (tx) => {
      await tx.product.update({
        where: {
          id: product.id
        },
        data: {
          ...payload,
        }
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
            productId: product.id,
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
    })
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

router.delete("/:handle", async (req, res, next) => {
  try {
    const product = await database.product.findUnique({
      where: {
        handle: req.params.handle
      }
    });
    if (!product) return res.status(404).send({ error: "Not found" });
    await database.product.update({
      where: {
        id: product.id,
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

