"use client";

import { useState } from "react";
import type { PromptBlock } from "@/types";
import { cn } from "@/lib/utils";
import { differencesByName } from "@/data/blockDifferences";

export function BlockCard({
  block,
  added,
  onAdd,
}: {
  block: PromptBlock;
  added?: boolean;
  onAdd?: (id: number) => void;
}) {
  const [showDiff, setShowDiff] = useState(false);
  const diffs = differencesByName[block.name] ?? [];

  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-background p-4 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-semibold tracking-tight text-foreground">{block.name}</h3>
        <span className="shrink-0 rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">
          {block.category}
        </span>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{block.description}</p>

      {diffs.length > 0 && (
        <button
          onClick={() => setShowDiff((v) => !v)}
          className="mt-2 flex w-fit items-center gap-1 text-[11px] text-muted transition-colors hover:text-foreground"
          aria-expanded={showDiff}
        >
          <span className={cn("transition-transform", showDiff && "rotate-90")}>›</span>
          비슷한 블록 구분 {diffs.length}
        </button>
      )}
      {showDiff && diffs.length > 0 && (
        <ul className="mt-2 space-y-1.5 rounded-[10px] border border-border bg-subtle/60 p-2.5">
          {diffs.map((d, i) => (
            <li key={i} className="text-[11px] leading-relaxed text-muted">
              <span className="font-medium text-foreground">vs {d.vs}</span> · {d.text}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div className="min-h-[18px] flex-1">
          {block.usedInPacks.length > 0 && (
            <p className="line-clamp-1 text-[11px] text-muted/80">
              추천 조합 · {block.usedInPacks.join(", ")}
            </p>
          )}
        </div>
        {onAdd && (
          <button
            onClick={() => onAdd(block.id)}
            disabled={added}
            className={cn(
              "h-7 shrink-0 rounded-[var(--radius-btn)] px-2.5 text-[12px] font-medium transition-colors",
              added
                ? "cursor-default border border-border bg-subtle text-muted"
                : "bg-ink text-white hover:bg-ink/90"
            )}
          >
            {added ? "추가됨" : "블록 추가"}
          </button>
        )}
      </div>
    </div>
  );
}
