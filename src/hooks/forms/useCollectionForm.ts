import { genRanHex } from "@/lib/utils";
import type { Collection } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "../useQuery";
import { http } from "@/infrastructure/http";
import { useMutation } from "../useMutation";
import { validate, type FormError } from "@/pages/collections/validator";
import { notify } from "@/pages/collections/notify";
import { useNavigate } from "react-router";

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
  const mutation = useMutation<Collection>();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormError>({});
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

  const save = async () => {
    const errors = validate(collection);
    if (Object.keys(errors).length) {
      setErrors(errors);
      notify.error();
      return;
    }
    console.log(collection);
    const formData = new FormData();
    formData.append("name", collection.name);
    formData.append("handle", collection.handle);
    formData.append("description", collection.description ?? "");
    formData.append("image", imageFile ?? collection.image ?? "");
    formData.append("products", JSON.stringify(collection.products));
    await mutation.execute(
      () => {
        if (mode === "create") {
          return http.post<Collection>("/collections", formData);
        }
        return http.patch<Collection>(
          `/collections/${handle}`,
          formData,
        );
      },
      {
        onSuccess: () => {
          notify.success();
          mode === "update" ? navigate(`/collections/${handle}`) : navigate(`/collections/${collection.handle}`);
        },
        onError: () => {
          notify.error();
        },
      }
    );
  };


  return {
    collection,
    setCollection,
    setImageFile,
    errors,
    imageFile,
    isSaving: mutation.loading,
    save,
    resetImage: () => {
      setCollection(prev => ({ ...prev, image: "" }))
    },
  }
}
