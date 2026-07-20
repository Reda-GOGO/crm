import { Heading } from "@/components/related/orders/Heading";
import Back from "@/components/shared/Back";

export default function Create() {
  return (
    <Back>
      <div className="mx-auto w-full max-w-screen-xl py-6">
        <Heading mode="create" />
      </div>
    </Back>
  )
}
