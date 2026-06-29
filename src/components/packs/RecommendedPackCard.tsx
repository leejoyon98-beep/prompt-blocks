"use client";

import type { RecommendedBlockPack } from "@/types";
import { blockById } from "@/data/promptBlocks";
import { Button } from "@/components/common/Button";

export function RecommendedPackCard({
  pack,
  onStart,
}: {
  pack: RecommendedBlockPack;
  onStart: (pack: RecommendedBlockPack) => void;
}) {
  const names = pack.blockIds
    .map((id) => blockById.get(id)?.name)
    .filter(Boolean) as string[];

  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-background p-4 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-semibold tracking-tight">{pack.name}</h3>
        <span className="shrink-0 rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">
          {pack.category}
        </span>
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{pack.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {names.slice(0, 5).map((n) => (
          <span key={n} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-foreground/80">
            {n}
          </span>
        ))}
        {names.length > 5 && (
          <span className="px-1 py-0.5 text-[11px] text-muted">+{names.length - 5}</span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-[12px] tabular-nums text-muted">블록 {pack.blockIds.length}개</span>
        <Button variant="outline" size="sm" onClick={() => onStart(pack)}>
          이 블록팩으로 시작
        </Button>
      </div>
    </div>
  );
}
