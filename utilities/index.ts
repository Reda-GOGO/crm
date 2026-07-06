export type query = {
  search?: string;

  pagination?: {
    page: number;
    limit: number;
    skip?: number;
  };

  filtering?: {
    key: string;
    value: string | boolean;
  };

  sorting?: {
    key: string;
    value: "asc" | "desc";
  };
};

/**
 * Parse query string to query object
 * @param query 
 */
export function parse(query: query): query {
  const q: query = {};

  if (query.search) {
    q.search = query.search;
  }

  if (query.pagination) {
    const page = Math.max(1, Number(query.pagination.page ?? 1));
    const limit = Math.max(1, Number(query.pagination.limit ?? 10));

    q.pagination = {
      page,
      limit,
      skip: (page - 1) * limit,
    };
  }

  if (query.filtering) {
    q.filtering = {
      key: query.filtering.key,
      value:
        query.filtering.value === "true"
          ? true
          : query.filtering.value === "false"
            ? false
            : query.filtering.value,
    };
  }

  if (query.sorting) {
    q.sorting = {
      key: query.sorting.key,
      value: query.sorting.value,
    };
  }

  return q;
}

/**
 * Build a db clause
 * @param query
 */

export function clause(query: query) {
  const where: Record<string, unknown> = {};
  const orderBy: Record<string, unknown> = {};
  if (query.sorting) {
    orderBy[query.sorting.key] = query.sorting.value;
  }
  if (query.filtering) {
    where[query.filtering.key] = query.filtering.value;
  }
  return {
    where,
    orderBy,
    take: query.pagination?.limit ?? 10,
    skip: ((query.pagination?.page ?? 1) - 1) * (query.pagination?.limit ?? 10),
  }
}

/**
 * Rank a resource by search
 * @param resource
 * @param search
 */
export function rank(resource: string, search: string) {

  const name = resource.toLowerCase();
  const q = search.toLowerCase();

  if (name === q) return 0;               // exact match
  if (name.startsWith(q)) return 1;       // prefix
  if (name.includes(q)) return 2;         // contains
  return 3;
}
