import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownUp, ListFilter, SearchIcon } from "lucide-react"
import { useListContext } from "./ListContext"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { useBoolean } from "@/hooks/useBoolean"

type SearchRenderProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

type SearchProps = {
  children?: (props: SearchRenderProps) => React.ReactNode;
  resource: string;
};

export function Search<T>({
  children,
  resource,
}: SearchProps) {
  const { search, setSearch, pagination } = useListContext<T>()
  const { t } = useTranslation();
  const { value, toggle } = useBoolean(true)

  if (children) {
    return children({ search, setSearch })
  }
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    pagination.reset()
  }
  return (

    <div className="flex w-full gap-4 items-center pb-3 justify-between">
      {
        value ? (<Tabs />) : (
          <Input
            autoFocus
            placeholder={t(resource + ".placeholder")}
            value={search}
            onChange={change} />

        )
      }

      <div className="flex gap-1">
        <Button
          onClick={toggle}
          variant={value ? "outline" : "default"}
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


function Tabs<T>() {
  const [active, setActive] = useState("all");
  const tabs = [
    { labelKey: "tabs.all", value: "all" },
    { labelKey: "tabs.active", value: "active" },
    { labelKey: "tabs.archived", value: "archived" },
  ]
  const { t } = useTranslation();
  const { filters } = useListContext<T>()

  const change = (value: string) => {
    setActive(value)
    switch (value) {
      case "active":
        filters.set({ key: "archived", value: false })
        break;
      case "archived":
        filters.set({ key: "archived", value: true })
        break;
      default:
        filters.reset()
        break;
    }
  }
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <Button size="sm"
          key={tab.value}
          variant={active === tab.value ? "default" : "outline"}
          onClick={() => change(tab.value)}>
          {t(tab.labelKey)}
        </Button>
      ))}
    </div>
  )
}
