"use client";

import type { RecommendedBlockPack } from "@/types";
import { blockById } from "@/data/promptBlocks";
import { tagById } from "@/data/promptTags";
import { Button } from "@/components/common/Button";
import { normalizeCategory } from "@/data/categories";

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
  const tagNames = (pack.tagIds ?? [])
    .map((id) => tagById.get(id)?.tag)
    .filter(Boolean) as string[];
  const category = normalizeCategory(pack.category);
  const hiddenCount = Math.max(0, names.length - 4) + Math.max(0, tagNames.length - 3);

  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-background p-4 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-semibold tracking-tight [word-break:keep-all]">{pack.name}</h3>
        <span className="shrink-0 rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">
          {category}
        </span>
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted [word-break:keep-all]">{pack.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {names.slice(0, 4).map((n) => (
          <span key={n} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-foreground/80">
            {n}
          </span>
        ))}
        {tagNames.slice(0, 3).map((n) => (
          <span key={n} className="rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">
            {n}
          </span>
        ))}
        {hiddenCount > 0 && (
          <span className="px-1 py-0.5 text-[11px] text-muted">+{hiddenCount}</span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-[12px] tabular-nums text-muted">
          블록 {pack.blockIds.length} · 태그 {tagNames.length}
        </span>
        <Button variant="outline" size="sm" onClick={() => onStart(pack)}>
          이 블록팩으로 시작
        </Button>
      </div>
    </div>
  );
}
