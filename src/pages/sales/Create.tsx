import Forms from "@/components/related/sales/forms";
import { Heading } from "@/components/related/sales/Heading";
import Back from "@/components/shared/Back";

export default function Create() {
  return (
    <Back>
      <div className="mx-auto w-full max-w-7xl py-6">
        <Heading mode="create" />
        <Content />
      </div>
    </Back>
  )
}

function Content() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8">
        <Forms.Items />
      </div>
      <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
        <Forms.Customer />
      </div>
    </div>
  )
}
