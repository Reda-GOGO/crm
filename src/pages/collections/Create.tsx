import Forms from "@/components/related/collections/forms";
import { Heading } from "@/components/related/collections/Heading";
import Back from "@/components/shared/Back";
import { useCollectionForm } from "@/hooks/forms/useCollectionForm";

export default function Create() {
  const form = useCollectionForm({ mode: "create" });
  return (
    <Back className="h-full">
      <div className="mx-auto w-full max-w-7xl py-6">
        <Heading mode="create" isSaving={form.isSaving} save={form.save} />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex-1 min-h-0 lg:col-span-4">
            <Forms.Basic form={form} />
          </div>
          <div className="col-span-12 flex  min-h-0 flex-col gap-6 lg:col-span-8">
            <Forms.Items form={form} />
          </div>
        </div>
      </div>

    </Back>
  );
}
