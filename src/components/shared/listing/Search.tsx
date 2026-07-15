import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownUp, ListFilter, SearchIcon } from "lucide-react"
import { useListContext } from "./ListContext"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
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
  const { search, setSearch, resetSearch, pagination } = useListContext<T>()
  const { t } = useTranslation();
  const { value, toggle, on, off } = useBoolean(true)

  if (children) {
    return children({ search, setSearch })
  }
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    pagination.reset()
  }

  useEffect(() => {
    const pressedKeys = new Set<string>();

    const down = (e: KeyboardEvent) => {
      pressedKeys.add(e.key);

      // Check if both " " (Space) and "a" are in the Set
      // Note: We use e.code === "Space" to avoid issues with scroll behavior
      const isSpacePressed = pressedKeys.has(" ");
      const isAPressed = pressedKeys.has("a") || pressedKeys.has("A");

      if (isSpacePressed && isAPressed) {
        // Prevent 'a' from being typed and 'Space' from scrolling the page
        e.preventDefault();

        if (value) {
          resetSearch()
          off()
        } else {
          resetSearch()
          on()
        }

        // Clear the set after trigger to prevent "sticky" firing
        pressedKeys.clear();
      }
    };

    const up = (e: KeyboardEvent) => {
      pressedKeys.delete(e.key);
    };

    document.addEventListener("keydown", down);
    document.addEventListener("keyup", up);

    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("keyup", up);
    };
  }, [value]);
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
