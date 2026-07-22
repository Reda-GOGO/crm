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
          { supplier: { name: { contains: query.search } } },
        ],
      };
    }

    const allItems = await database.purchase.count();

    const purchases = await database.purchase.findMany({
      where,
      orderBy,
      take,
      skip,
      include: {
        supplier: true,
      },
    });

    if (query.search) {
      purchases.sort((a, b) =>
        rank(a.supplier.name, query.search!) - rank(b.supplier.name, query.search!)
      );
    }

    res.json({
      items: purchases,
      allItems,
      totalItems: purchases.length,
      totalPages: Math.ceil(allItems / take),
      currentPage: query.pagination?.page ?? 1,
    });

  } catch (e) {
    next(e);
  }
})

export default router;
