import { Layers } from "lucide-react";

export function ImageCard({ image }: { image?: string | null | undefined }) {
  if (image) {
    return (
      <img
        src={`${import.meta.env.VITE_API_URL}${image}`}
        alt={image}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle,theme(colors.border)_1px,transparent_1px)] bg-[length:16px_16px]">
      <Layers className="h-10 w-10 text-muted-foreground/30" />
      <span className="text-xs text-muted-foreground/50">No image uploaded</span>
    </div>
  );
}
