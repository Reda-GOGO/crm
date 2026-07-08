import express from "express";
import database from "../services/database";
import { clause, parse, rank } from "../utilities";

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
    });
    if (!collection) return res.status(404).json({ error: "Not found" });
    res.json(collection);
  } catch (e) {
    next(e);
  }
});

export default router;
