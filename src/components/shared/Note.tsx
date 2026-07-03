import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export function Note({
  children,
  className = "",
  dir = "ltr",
}: {
  children: React.ReactNode;
  className?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div
      dir={dir}
      className={cn(
        " w-full flex flex-col min-w-70 bg-input/30  h-20 border px-3 py-4 gap-2 hover:bg-muted/70 rounded-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function NoteHeader({
  label,
  tooltipContent,
}: { label: string; tooltipContent?: React.ReactNode }) {
  return (
    <div className="flex w-full cursor-pointer">
      <span
        className="text-sm font-semibold max-sm:text-xs underline decoration-dashed 
        decoration-2 underline-offset-4 decoration-black/20 dark:decoration-white/20"
      >
        <NoteHoverCard title={label} content={tooltipContent} />
      </span>
    </div>
  );
}

export function NoteHoverCard({
  title,
  content,
}: { title: string; content?: React.ReactNode }) {
  return (
    <HoverCard>
      <HoverCardTrigger>{title}</HoverCardTrigger>
      {content && (
        <HoverCardContent className="p-1 flex pt-1">{content}</HoverCardContent>
      )}
    </HoverCard>
  );
}

export function NoteContent({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex justify-between items-center ", className)}>
      {children}
    </div>
  );
}

export function NoteChart({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex w-20 h-6", className)}> {children}</div>;
}
