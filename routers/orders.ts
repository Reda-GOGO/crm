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
          { customer: { name: { contains: query.search } } },
        ],
      };
    }

    const allItems = await database.order.count();

    const orders = await database.order.findMany({
      where,
      orderBy,
      take,
      skip,
      include: {
        customer: true,
      },
    });

    if (query.search) {
      orders.sort((a, b) =>
        rank(a.customer.name, query.search!) - rank(b.customer.name, query.search!)
      );
    }

    res.json({
      items: orders,
      allItems,
      totalItems: orders.length,
      totalPages: Math.ceil(allItems / take),
      currentPage: query.pagination?.page ?? 1,
    });

  } catch (e) {
    next(e);
  }
})

export default router;
