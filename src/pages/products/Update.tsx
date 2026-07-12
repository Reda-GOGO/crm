import Forms from "@/components/related/products/forms";
import { Heading } from "@/components/related/products/Heading";
import Back from "@/components/shared/Back";
import { useQuery } from "@/hooks/useQuery";
import { http } from "@/infrastructure/http";
import type { Product } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Update() {
  const { handle } = useParams();
  const queryFn = useCallback(() => {
    return http.get<Product>("/products/" + handle);
  }, [handle]);
  const { data } = useQuery<Product>(queryFn);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    handle: "",
    description: "",
    image: "",
    cost: 0,
    price: 0,
    createdAt: new Date(),
    unit: "",
    units: [],
    archived: false,
    availableQty: 0,
  });

  useEffect(() => {
    if (data) setProduct(data);
  }, [data]);



  const save = () => {
    setIsSaving(true);
    console.log("saving...")
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
    console.log("saved : ", product)
  }

  return (
    <Back>
      <div className="mx-auto w-full max-w-screen-xl py-6">
        <Heading mode="update" isSaving={isSaving} save={save} />
        <Content
          product={product} setProduct={setProduct}
          imageFile={imageFile} setImageFile={setImageFile}
        />
      </div>
    </Back>
  )
}

function Content({
  product,
  setProduct,
  imageFile,
  setImageFile
}: {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-5">
        <Forms.Basic
          product={product} setProduct={setProduct}
          imageFile={imageFile} setImageFile={setImageFile}
        />
      </div>
      {product && (

        <div className="col-span-12 flex flex-col gap-6 lg:col-span-7">
          <Forms.Pricing product={product} setProduct={setProduct} />
          <Forms.Stocking product={product} setProduct={setProduct} />
        </div>
      )}
    </div>
  );
}
