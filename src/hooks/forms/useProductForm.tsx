import { http } from "@/infrastructure/http";
import { genRanHex, tempId } from "@/lib/utils"
import { validate, type FormError } from "@/pages/products/validator";
import type { Product, Unit } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "../useQuery";
import { notify } from "@/pages/products/notify";

const INITIAL_STATE = {
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
function createUnit(product: Product): Omit<Unit, "isBase"> {
  return {
    id: tempId(),
    name: "",
    cost: 0,
    price: 0,
    createdAt: new Date(),
    updatedAt: null,
    archived: false,
    productId: product.id,
    quantityInBase: 1,
    defaultValue: 1,
    variantValue: 1,
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
  const [product, setProduct] = useState<Product>(INITIAL_STATE);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FormError>({});
  const base = product.units.find((u) => u.isBase);
  const variants = product.units.filter((u) => !u.isBase);
  const initial = createUnit(product);
  const queryFn = useCallback(() => {
    if (options.mode !== "update") {
      throw new Error("queryFn called in create mode");
    }

    return http.get<Product>("/products/" + options.handle);
  }, [options]);
  const { data } = useQuery<Product | null>(queryFn, {
    enabled: options.mode === "update",
  });


  useEffect(() => {
    if (data) setProduct(data);
  }, [data]);

  const save = () => {
    setIsSaving(true);
    setErrors(validate(product))
    setIsSaving(false);
    notify.success();
  }



  const unit = {
    base,
    variants,
    addBase: () => {
      setProduct((prev) => ({
        ...prev,
        units: [...prev.units, { ...initial, isBase: true }],
      }));
    },
    updateBase: (id: number, patch: Partial<Unit>) => {
      setProduct((prev) => {
        return {
          ...prev,
          cost: patch.cost ?? prev.cost,
          price: patch.price ?? prev.price,
          unit: patch.name ?? prev.unit,
          units: prev.units.map((u) => (u.id === id ? { ...u, ...patch } : u))
        }
      })
    },
    addVariant: () => {
      setProduct((prev) => ({
        ...prev,
        units: [...prev.units, { ...initial, isBase: false }],
      }));
    },

    removeVariant: (id: number) => {
      setProduct((prev) => ({ ...prev, units: prev.units.filter((u) => u.id !== id) }));
    },

    updateVariant: (id: number, patch: Partial<Unit>) => {
      setProduct((prev) => ({ ...prev, units: prev.units.map((u) => (u.id === id ? { ...u, ...patch } : u)) }))
    }
  }

  return {
    product,
    setProduct,
    imageFile,
    setImageFile,
    isSaving,
    unit,
    errors,
    save,
  }
}
