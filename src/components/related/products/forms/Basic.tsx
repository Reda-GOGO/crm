import { useState, useEffect, useRef } from "react";
import { Hash, ImagePlus, Info, Sparkles, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { useProductFormReturnType } from "@/hooks/forms/useProductForm";

export function Basic({ form }: { form: useProductFormReturnType }) {
  const [autoHandle, setAutoHandle] = useState(true);
  const [autoDescription, setAutoDescription] = useState(true);
  const { t } = useTranslation()
  const namespace = "products";

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-primary" />
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t(namespace + ".productBasic.information")}
          </CardTitle>
        </div>
        <CardDescription>{t(namespace + ".productBasic.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="relative aspect-square w-full overflow-hidden rounded-lg border border-dashed bg-muted/20 transition-colors hover:bg-muted/30">
          <ImageCard
            image={form.product.image}
            file={form.imageFile}
            onFileChange={form.setImageFile} />

          <div className="hidden ddflex pointer-events-none absolute inset-x-0 bottom-0  items-center justify-center gap-1.5 bg-gradient-to-t from-background/90 to-transparent py-3 text-xs text-muted-foreground">
            Square image, at least 800 × 800px
          </div>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t(namespace + ".productBasic.name")}
            </FieldLabel>
            <Input
              value={form.product.name}
              onChange={(e) => form.setProduct({ ...form.product, name: e.target.value })}
              placeholder={t(namespace + ".productBasic.placeholders.name")} />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t(namespace + ".productBasic.handle")}
              </FieldLabel>
              <AutoToggle checked={autoHandle} onCheckedChange={setAutoHandle} />
            </div>
            <div
              className={cn(
                "flex items-center gap-1 transition-colors focus-within:ring-1 focus-within:ring-ring",
                autoHandle && "bg-muted/30"
              )}
            >
              <div className="p-2 ">
                <Hash className="h-3.5 w-3.5" />
              </div>
              <Input
                value={form.product.handle}
                onChange={(e) => form.setProduct({ ...form.product, handle: e.target.value })}
                disabled={autoHandle}
                placeholder={autoHandle ?
                  t(namespace + ".productBasic.placeholders.autoHandle")
                  : t(namespace + ".productBasic.placeholders.customHandle")
                }
                className={cn(
                  "border-0 font-mono shadow-none focus-visible:ring-0",
                  autoHandle && "text-muted-foreground"
                )}
              />
            </div>
            <FieldDescription>
              {
                autoHandle ?
                  t(namespace + ".productBasic.handleDescription.auto")
                  : t(namespace + ".productBasic.handleDescription.manual")
              }
            </FieldDescription>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t(namespace + ".productBasic.productDescription")}
              </FieldLabel>
              <AutoToggle checked={autoDescription} onCheckedChange={setAutoDescription} />
            </div>
            <Textarea
              disabled={autoDescription}
              value={form.product.description!}
              onChange={(e) => form.setProduct({ ...form.product, description: e.target.value })}
              placeholder={
                autoDescription
                  ? t(namespace + ".productBasic.placeholders.autoDescription")
                  : t(namespace + ".productBasic.placeholders.manualDescription")
              }
              className={cn(autoDescription && "bg-muted/30 text-muted-foreground")}
              rows={4}
            />
            <FieldDescription>
              {autoDescription
                ? t(namespace + ".productBasic.descriptionHelp.auto")
                : t(namespace + ".productBasic.descriptionHelp.manual")
              }
            </FieldDescription>
          </Field>

          <FieldSeparator />

          <Field orientation="horizontal">
            <Switch
              dir={"ltr"}
              id="status-active" defaultChecked />
            <div className="flex flex-col gap-0.5">
              <FieldLabel htmlFor="status-active" className="text-sm font-medium">
                {t(namespace + ".productBasic.active")}
              </FieldLabel>
              <FieldDescription>{t(namespace + ".productBasic.activeDescription")}</FieldDescription>
            </div>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

function AutoToggle({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const { t } = useTranslation();
  const namespace = "products";
  return (
    <label className="flex cursor-pointer items-center gap-1.5">
      <Badge
        variant="outline"
        className={cn(
          "gap-1 font-normal transition-colors",
          checked
            ? "border-primary/30 bg-primary/5 text-primary"
            : "border-border text-muted-foreground"
        )}
      >
        <Sparkles className="h-3 w-3" />
        {t(namespace + ".productBasic.auto")}
      </Badge>
      <Switch
        dir={"ltr"}
        checked={checked} onCheckedChange={onCheckedChange} className="scale-90" />
    </label>
  );
}




type ImageCardProps = {
  image?: string | null;
  file: File | null;
  onFileChange: (file: File | null) => void;
};

export function ImageCard({
  image,
  file,
  onFileChange,
}: ImageCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }

    if (image) {
      setPreview(`${import.meta.env.VITE_API_URL}${image}`);
    } else {
      setPreview(null);
    }
  }, [file, image]);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onFileChange(selected);
  };

  const handleRemove = () => {
    onFileChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-dashed bg-muted/20">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {preview ? (
        <>
          <img
            src={preview}
            alt="Product"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-black/40 p-3 backdrop-blur-sm">
            <Button
              size="sm"
              variant="secondary"
              type="button"
              onClick={openPicker}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Change
            </Button>

            <Button
              size="sm"
              variant="destructive"
              type="button"
              onClick={handleRemove}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          className="flex h-full w-full flex-col items-center justify-center gap-3 transition hover:bg-muted/40"
        >
          <ImagePlus className="h-10 w-10 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Upload image
          </span>
        </button>
      )}
    </div>
  );
}
