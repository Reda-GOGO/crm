import Forms from "@/components/related/sales/forms";
import { Heading } from "@/components/related/sales/Heading";
import Back from "@/components/shared/Back";
import { useSaleForm, type useSaleFormReturnType } from "@/hooks/forms/useSaleForm";

export default function Create() {
  const form = useSaleForm();
  return (
    <Back>
      <div className="mx-auto w-full max-w-7xl py-6">
        <Heading mode="create" />
        <Content form={form} />
      </div>
    </Back>
  )
}

function Content({ form }: { form: useSaleFormReturnType }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-2">
        <Forms.Items form={form} />
        <Forms.Payment form={form} />
      </div>
      <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
        <Forms.Customer />
        <Forms.OrderDocument />
      </div>
    </div>
  )
}
