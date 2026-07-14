import { http } from "@/infrastructure/http";
import { genRanHex } from "@/lib/utils"
import { validate, type FormError } from "@/pages/products/validator";
import type { Product } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "../useQuery";
import { notify } from "@/pages/products/notify";
import { useUnits } from "./useUnits";
import { useMutation } from "../useMutation";
import { useNavigate } from "react-router";

function initialize() {
  const handle = genRanHex(16);
  return {
    id: 0,
    name: "",
    handle,
    description: `this is a descrition of product with handle ${handle}`,
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
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>(initialize());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const mutation = useMutation<Product>();
  const [errors, setErrors] = useState<FormError>({});
  const initialized = useRef(false);
  const mode = options.mode;
  const handle = mode === "update" ? options.handle : undefined;
  const queryFn = useCallback(() => {
    if (options.mode !== "update") {
      throw new Error("queryFn called in create mode");
    }

    return http.get<Product>("/products/" + options.handle);
  }, [handle, mode]);
  const { data } = useQuery<Product | null>(queryFn, {
    enabled: mode === "update",
  });

  const unit = useUnits({ product, setProduct });

  useEffect(() => {
    if (!data || initialized.current) return;

    initialized.current = true;
    setProduct(data);
  }, [data]);

  const save = async () => {
    const errors = validate(product);

    if (Object.keys(errors).length) {
      setErrors(errors);
      notify.error();
      return;
    }

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("handle", product.handle);
    formData.append("description", product.description ?? "");
    formData.append("cost", product.cost.toString());
    formData.append("price", product.price.toString());
    formData.append("unit", product.unit ?? "");
    formData.append("units", JSON.stringify(product.units));
    formData.append("image", imageFile ?? product.image ?? "");

    await mutation.execute(
      () => {
        if (mode === "create") {
          return http.post<Product>("/products", formData);
        }

        return http.patch<Product>(
          `/products/${handle}`,
          formData,
        );
      },
      {
        onSuccess: () => {
          notify.success();
          mode === "update" ? navigate(`/products/${handle}`) : navigate(`/products/${product.handle}`);
        },
        onError: () => {
          notify.error();
        },
      }
    );
  };




  return {
    product,
    setProduct,
    imageFile,
    setImageFile,
    isSaving: mutation.loading,
    unit: unit,
    errors,
    save,
    resetImage: () => {
      setProduct(prev => ({ ...prev, image: "" }))
    },
  }
}
