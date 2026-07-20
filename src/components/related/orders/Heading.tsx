import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

type HeadingProps = {
  mode: "create" | "update";
  isSaving?: boolean;
};

export function Heading({
  mode,
  isSaving = false,
}: HeadingProps) {
  const navigate = useNavigate();

  return (
    <div className=" top-0 z-10 -mx-6 mb-6 flex items-center justify-between border-b bg-background/95 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="font-serif text-2xl font-medium tracking-tight">
          {mode === "create" ? "New Order" : "Edit Order"}
        </h1>

        <p className="text-sm text-muted-foreground">
          {mode === "create" ? "Start creating your own order here ." : "Edit your given order with new information "}

        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button
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
