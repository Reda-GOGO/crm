import { genRanHex } from "@/lib/utils";
import type { Collection } from "@/types";
import { useState } from "react";

type FormOptions =
  | {
    mode: "create";
  }
  | {
    mode: "update";
    handle: string;
  };

function initialize() {
  return {
    id: 0,
    name: "",
    handle: genRanHex(16),
    image: "",
    products: [],
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    archived: false,
  }
}

export type useCollectionFormReturnType = ReturnType<typeof useCollectionForm>

type CollectionDTO = Omit<Collection, "tags" | "_count">;

export function useCollectionForm(options: FormOptions) {
  const [collection, setCollection] = useState<CollectionDTO>(initialize());
  console.log(options);
  return {
    collection,
    setCollection,
  }
}
