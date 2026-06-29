"use client";

import type { PromptTag } from "@/types";
import { cn } from "@/lib/utils";

export function TagCard({
  tag,
  added,
  onAdd,
}: {
  tag: PromptTag;
  added?: boolean;
  onAdd?: (id: string) => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-background p-4 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold tracking-tight text-foreground">{tag.tag}</h3>
          <p className="mt-0.5 text-[12px] text-muted">{tag.labelKo}</p>
        </div>
        <span className="shrink-0 rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">
          {tag.category}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">{tag.meaning}</p>
      <p className="mt-2 line-clamp-2 rounded-[10px] bg-subtle/70 px-2.5 py-2 text-[12px] leading-relaxed text-muted">
        {tag.promptText}
      </p>

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div className="min-h-[18px] flex-1">
          {tag.aliases && tag.aliases.length > 0 && (
            <p className="line-clamp-1 text-[11px] text-muted/80">{tag.aliases.join(", ")}</p>
          )}
        </div>
        {onAdd && (
          <button
            onClick={() => onAdd(tag.id)}
            disabled={added}
            className={cn(
              "h-7 shrink-0 rounded-[var(--radius-btn)] px-2.5 text-[12px] font-medium transition-colors",
              added
                ? "cursor-default border border-border bg-subtle text-muted"
                : "bg-ink text-white hover:bg-ink/90"
            )}
          >
            {added ? "추가됨" : "태그 추가"}
          </button>
        )}
      </div>
    </div>
  );
}
