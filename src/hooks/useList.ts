import { useEffect, useState } from "react"
import { useSearch } from "./useSearch";

export type useListReturnType<T> = ReturnType<typeof useList<T>>

export function useList<T>({
  type = "page",
  resource,
}: {
  type: "infinite" | "page";
  resource: string;
}) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { search, setSearch, debouncedSearch } = useSearch<string>({ value: "" })
  const [pagination, setPagination] = useState({
    limit: 7,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  })

  useEffect(() => {
    try {
      setLoading(true)
      fetch(`${import.meta.env.VITE_API_URL}/${resource}?search=${debouncedSearch}&limit=${pagination.limit}&page=${pagination.currentPage}`)
        .then((res) => res.json())
        .then((data) => {
          setData((prev) => {
            if (type === "page") return data.products
            if (type === "infinite") {
              return pagination.currentPage === 1 ?
                data.products :
                [...prev, ...data.products]
            }
          })
          setPagination({
            ...pagination,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
          })
          setLoading(false)
        })
    } catch (e) {

    }
  }, [resource, debouncedSearch, pagination.limit, pagination.currentPage])


  return {
    data,
    loading,
    setSearch,
    search,
    pagination, setPagination,
  }
}
