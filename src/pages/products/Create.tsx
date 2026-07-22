import Back from "@/components/shared/Back";
import { Heading } from "@/components/related/products/Heading";
import Forms from "@/components/related/products/forms";
import { useProductForm, type useProductFormReturnType } from "@/hooks/forms/useProductForm";

export default function Create() {
  const form = useProductForm({ mode: "create" });
  return (
    <Back>
      <div className="mx-auto w-full max-w-7xl py-6">
        <Heading mode="create" isSaving={form.isSaving} save={form.save} />
        <Content form={form} />
      </div>
    </Back>
  );
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

