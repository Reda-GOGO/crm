import express from "express";
import database from "../services/database";
import { clause, parse, rank } from "../utilities";
import { Product } from "../generated/prisma/client";

const router = express.Router({
  mergeParams: true,
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

export default router;

