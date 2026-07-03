import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownUp, ListFilter, SearchIcon } from "lucide-react"
import { useListContext } from "./ListContext"
import { useTranslation } from "react-i18next"

type SearchRenderProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

type SearchProps = {
  children?: (props: SearchRenderProps) => React.ReactNode;
};

export function Search<T>({
  children,
}: SearchProps) {
  const { search, setSearch } = useListContext<T>()
  const { t } = useTranslation();

  if (children) {
    return children({ search, setSearch })
  }
  return (

    <div className="flex w-full gap-4 items-center pb-3">
      <Input placeholder={t("products.placeholder")} value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="flex gap-1">
        <Button
          size="sm"
        >
          <SearchIcon className="mr-1" />
          <ListFilter />
        </Button>
        <Button variant="outline" size="sm">
          <ArrowDownUp />
        </Button>
      </div>
    </div>
  )
}

