import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

type HeadingProps = {
  mode: "create" | "update";
  isSaving?: boolean;
  save: () => void;
};

export function Heading({
  mode,
  isSaving = false,
  save,
}: HeadingProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const namespace = "products.heading.";

  return (
    <div className=" top-0 z-10 -mx-6 mb-6 flex items-center justify-between border-b bg-background/95 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="font-serif text-2xl font-medium tracking-tight">
          {t(namespace + "productForm." + mode + ".title")}
        </h1>

        <p className="text-sm text-muted-foreground">
          {t(namespace + "productForm." + mode + ".description")}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          {t(namespace + "common.cancel")}
        </Button>

        <Button
          onClick={save}
        >
          {isSaving
            ? t(namespace + "common.saving")
            : t(namespace + "productForm." + mode + ".submit")}
        </Button>
      </div>
    </div>
  );
}
