"use client";

import { useState } from "react";
import type { PromptTag } from "@/types";
import { cn } from "@/lib/utils";

const shortSimilarDifferences: Record<string, Record<string, string>> = {
  "TL;DR": {
    "summary-first": "답변 전체를 결론 우선 구조로 정리",
    concise: "전체 답변을 짧고 간결하게 정리",
  },
  "summary-first": {
    "TL;DR": "긴 답변 앞에 붙는 1~2줄짜리 초압축 요약",
  },
  concise: {
    "TL;DR": "긴 답변 앞에 붙는 1~2줄짜리 초압축 요약",
  },
};

function getSimilarDifference(tag: PromptTag, similar: NonNullable<PromptTag["similarTags"]>[number]) {
  const text = shortSimilarDifferences[tag.tag]?.[similar.tag] ?? similar.difference;

  if (text.length <= 70) {
    return text;
  }

  return `${text.slice(0, 70).trim()}...`;
}

export function TagCard({
  tag,
  added,
  onAdd,
}: {
  tag: PromptTag;
  added?: boolean;
  onAdd?: (id: string) => void;
}) {
  const [showSimilar, setShowSimilar] = useState(false);
  const similarTags = tag.similarTags ?? [];
  const hasSimilar = similarTags.length > 0;

  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-[var(--radius-card)] border border-border bg-background p-4 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold tracking-tight text-foreground">{tag.tag}</h3>
          <p className="mt-0.5 text-[12px] text-muted">{tag.labelKo}</p>
        </div>
        <span className="shrink-0 rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">
          {tag.category}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-muted">{tag.meaning}</p>

      {hasSimilar && (
        <button
          type="button"
          onClick={() => setShowSimilar((value) => !value)}
          className="mt-2 flex w-fit items-center gap-1 text-[11px] text-muted transition-colors hover:text-foreground"
          aria-expanded={showSimilar}
        >
          <span className={cn("transition-transform", showSimilar && "rotate-90")}>›</span>
          비슷한 태그 구분 {similarTags.length}
        </button>
      )}
      {showSimilar && hasSimilar && (
        <ul className="mt-2 space-y-1.5 rounded-[10px] border border-border bg-subtle/60 p-2.5">
          {similarTags.map((similar) => (
            <li key={similar.tag} className="text-[11px] leading-relaxed text-muted">
              <span className="font-medium text-foreground">{similar.tag}</span> ·{" "}
              {getSimilarDifference(tag, similar)}
            </li>
          ))}
        </ul>
      )}

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
