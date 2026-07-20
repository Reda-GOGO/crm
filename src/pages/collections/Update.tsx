import Forms from "@/components/related/collections/forms";
import { Heading } from "@/components/related/collections/Heading";
import Back from "@/components/shared/Back";
import { useCollectionForm } from "@/hooks/forms/useCollectionForm";
import { useParams } from "react-router";

export default function Update() {
  const { handle } = useParams();
  const form = useCollectionForm({ handle: handle!, mode: "update" });
  return (
    <Back>
      <div className="mx-auto w-full max-w-screen-xl py-6">
        <Heading mode="update" isSaving={form.isSaving} save={form.save} />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <Forms.Basic form={form} />
          </div>
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
            <Forms.Items form={form} />
          </div>
        </div>

      </div>
    </Back>
  );
}
