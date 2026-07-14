import { http } from "@/infrastructure/http";
import { genRanHex } from "@/lib/utils"
import { validate, type FormError } from "@/pages/products/validator";
import type { Product } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "../useQuery";
import { notify } from "@/pages/products/notify";
import { useUnits } from "./useUnits";

function initialize() {
  return {
    id: 0,
    name: "",
    handle: genRanHex(16),
    description: "",
    image: "",
    cost: 0,
    price: 0,
    createdAt: new Date(),
    unit: "",
    units: [],
    archived: false,
    availableQty: 0,

  }
}

export type useProductFormReturnType = ReturnType<typeof useProductForm>

type FormOptions =
  | {
    mode: "create";
  }
  | {
    mode: "update";
    handle: string;
  };


export function useProductForm(options: FormOptions) {
  const [product, setProduct] = useState<Product>(initialize());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FormError>({});
  const queryFn = useCallback(() => {
    if (options.mode !== "update") {
      throw new Error("queryFn called in create mode");
    }

    return http.get<Product>("/products/" + options.handle);
  }, [options]);
  const { data } = useQuery<Product | null>(queryFn, {
    enabled: options.mode === "update",
  });

  const unit = useUnits({ product, setProduct });

  useEffect(() => {
    if (data) setProduct(data);
  }, [data]);

  const save = () => {
    setIsSaving(true);
    setErrors(validate(product))
    setIsSaving(false);
    notify.success();
  }




  return {
    product,
    setProduct,
    imageFile,
    setImageFile,
    isSaving,
    unit: unit.unit,
    errors,
    save,
  }
}
