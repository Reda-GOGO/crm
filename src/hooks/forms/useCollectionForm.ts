import { genRanHex } from "@/lib/utils";
import type { Collection } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "../useQuery";
import { http } from "@/infrastructure/http";

type FormOptions =
  | {
    mode: "create";
  }
  | {
    mode: "update";
    handle: string;
  };

function initialize() {
  const handle = genRanHex(16);
  return {
    id: 0,
    name: "",
    handle,
    image: "",
    products: [],
    description: `this is a description of collection with handle ${handle}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    archived: false,
  }
}

export type useCollectionFormReturnType = ReturnType<typeof useCollectionForm>

type CollectionDTO = Omit<Collection, "tags" | "_count">;

export function useCollectionForm(options: FormOptions) {
  const [collection, setCollection] = useState<CollectionDTO>(initialize());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const initialized = useRef(false);
  const mode = options.mode;
  const handle = mode === "update" ? options.handle : undefined;
  const queryFn = useCallback(() => {
    if (options.mode !== "update") {
      throw new Error("queryFn called in create mode");
    }

    return http.get<Collection>("/collections/" + options.handle);
  }, [handle, mode]);
  const { data } = useQuery<Collection | null>(queryFn, {
    enabled: mode === "update",
  });
  useEffect(() => {
    if (!data || initialized.current) return;

    initialized.current = true;
    setCollection(data);
  }, [data]);


  return {
    collection,
    setCollection,
    setImageFile,
    imageFile,
    resetImage: () => {
      setCollection(prev => ({ ...prev, image: "" }))
    },
  }
}
