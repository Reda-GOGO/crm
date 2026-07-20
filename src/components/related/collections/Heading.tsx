import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

type HeadingProps = {
  mode: "create" | "update";
  isSaving?: boolean;
  save?: () => void;
};

export function Heading({
  mode,
  isSaving = false,
  save,
}: HeadingProps) {
  const navigate = useNavigate();

  return (
    <div className=" top-0 z-10 -mx-6 mb-6 flex items-center justify-between border-b bg-background/95 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="font-serif text-2xl font-medium tracking-tight">
          {mode === "create" ? "New Collection" : "Edit Collection"}
        </h1>

        <p className="text-sm text-muted-foreground">
          {mode === "create" ? "Start creating your own collection here ." : "Edit your given collection with new information "}

        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button
          onClick={save}
        >
          {isSaving
            ? "Saving ..."
            : "Save changes"
          }
        </Button>
      </div>
    </div>
  );
}
