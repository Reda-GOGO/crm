import { cn } from "@/lib/utils";

export function Grid({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {children}
    </div>
  )
}
