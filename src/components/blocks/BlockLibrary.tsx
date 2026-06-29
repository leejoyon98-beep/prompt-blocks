"use client";

import { useMemo } from "react";
import type { PromptBlock } from "@/types";
import { BlockCard } from "./BlockCard";
import { SearchInput } from "./SearchInput";
import { EmptyState } from "@/components/common/EmptyState";
import { ALL } from "./CategorySidebar";
import { normalizeCategory } from "@/data/categories";

export function BlockLibrary({
  blocks,
  category,
  search,
  onSearchChange,
  selectedIds,
  onAdd,
}: {
  blocks: PromptBlock[];
  category: string;
  search: string;
  onSearchChange: (v: string) => void;
  selectedIds?: Set<number>;
  onAdd?: (id: number) => void;
}) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blocks.filter((b) => {
      if (category !== ALL && normalizeCategory(b.category) !== category) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.searchTags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [blocks, category, search]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={onSearchChange} />
        </div>
        <span className="shrink-0 text-[12px] tabular-nums text-muted">{filtered.length}개</span>
      </div>

      <div className="mt-4 flex-1">
        {filtered.length === 0 ? (
          <EmptyState
            title="검색 결과가 없어요."
            description="다른 키워드나 카테고리로 찾아보세요."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {filtered.map((b) => (
              <BlockCard key={b.id} block={b} added={selectedIds?.has(b.id)} onAdd={onAdd} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
