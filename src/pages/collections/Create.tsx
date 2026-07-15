import Forms from "@/components/related/collections/forms";
import { Heading } from "@/components/related/collections/Heading";
import Back from "@/components/shared/Back";

export default function Create() {
  return (
    <Back>
      <div className="mx-auto w-full max-w-screen-xl py-6">
        <Heading mode="create" />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <Forms.Basic />
          </div>
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
            <Forms.Items />
          </div>
        </div>
      </div>

    </Back>
  );
}
