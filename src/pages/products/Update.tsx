import Forms from "@/components/related/products/forms";
import { Heading } from "@/components/related/products/Heading";
import Back from "@/components/shared/Back";
import { useProductForm, type useProductFormReturnType } from "@/hooks/forms/useProductForm";
import { useParams } from "react-router";

export default function Update() {
  const { handle } = useParams();

  const form = useProductForm({ mode: "update", handle: handle! });
  return (
    <Back>
      <div className="mx-auto w-full max-w-screen-xl py-6">
        <Heading mode="update" isSaving={form.isSaving} save={form.save} />
        <Content form={form} />
      </div>
    </Back>
  )
}

function Content({ form }: { form: useProductFormReturnType }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-5">
        <Forms.Basic form={form} />
      </div>
      <div className="col-span-12 flex flex-col gap-6 lg:col-span-7">
        <Forms.Pricing form={form} />
        <Forms.Stocking form={form} />
      </div>
    </div>
  );
}
