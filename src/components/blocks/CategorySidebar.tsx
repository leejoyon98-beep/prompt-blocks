"use client";

import { cn } from "@/lib/utils";

export const ALL = "전체";

export function CategorySidebar({
  categories,
  active,
  counts,
  onSelect,
  className,
}: {
  categories: readonly string[];
  active: string;
  counts: Record<string, number>;
  onSelect: (c: string) => void;
  className?: string;
}) {
  const items = [ALL, ...categories];
  return (
    <nav className={cn("flex w-full min-w-0 gap-0.5", className)}>
      {items.map((c) => {
        const isActive = c === active;
        return (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={cn(
              "flex w-auto shrink-0 items-center justify-between gap-1 rounded-[var(--radius-btn)] px-3 py-1.5 text-left text-[13px] transition-colors lg:w-full lg:shrink",
              isActive ? "bg-subtle font-medium text-foreground" : "text-muted hover:bg-subtle hover:text-foreground"
            )}
          >
            <span className="truncate">{c}</span>
            <span className={cn("ml-2 shrink-0 tabular-nums text-[12px]", isActive ? "text-muted" : "text-muted/70")}>
              {counts[c] ?? 0}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
