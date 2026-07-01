"use client";

import { useMemo } from "react";
import type { PromptTag } from "@/types";
import { EmptyState } from "@/components/common/EmptyState";
import { SearchInput } from "@/components/blocks/SearchInput";
import { TagCard } from "./TagCard";

export function TagLibrary({
  tags,
  category,
  search,
  onSearchChange,
  selectedIds,
  onAdd,
}: {
  tags: PromptTag[];
  category: string;
  search: string;
  onSearchChange: (v: string) => void;
  selectedIds?: Set<string>;
  onAdd?: (id: string) => void;
}) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tags.filter((tag) => {
      if (category !== "전체" && tag.category !== category) return false;
      if (!q) return true;
      return (
        tag.tag.toLowerCase().includes(q) ||
        tag.labelKo.toLowerCase().includes(q) ||
        tag.meaning.toLowerCase().includes(q) ||
        tag.promptText.toLowerCase().includes(q) ||
        tag.aliases?.some((alias) => alias.toLowerCase().includes(q))
      );
    });
  }, [tags, category, search]);

  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <div className="flex w-full min-w-0 items-center gap-3">
        <div className="min-w-0 flex-1">
          <SearchInput value={search} onChange={onSearchChange} />
        </div>
        <span className="shrink-0 text-[12px] tabular-nums text-muted">{filtered.length}개</span>
      </div>

      <div className="mt-4 w-full min-w-0 flex-1">
        {filtered.length === 0 ? (
          <div className="w-full">
            <EmptyState
              title="검색 결과가 없어요."
              description="다른 검색어나 카테고리로 조각 태그를 찾아보세요."
            />
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 justify-stretch gap-3 sm:grid-cols-[repeat(2,minmax(0,1fr))]">
            {filtered.map((tag) => (
              <TagCard key={tag.id} tag={tag} added={selectedIds?.has(tag.id)} onAdd={onAdd} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
