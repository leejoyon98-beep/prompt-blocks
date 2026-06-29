"use client";

import { useState } from "react";
import { promptBlocks } from "@/data/promptBlocks";
import { UI_CATEGORIES } from "@/data/categories";
import { PageShell } from "@/components/layout/PageShell";
import { CategorySidebar, ALL } from "@/components/blocks/CategorySidebar";
import { BlockLibrary } from "@/components/blocks/BlockLibrary";

const categoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = { [ALL]: promptBlocks.length };
  for (const c of UI_CATEGORIES) counts[c] = 0;
  for (const b of promptBlocks) counts[b.category] = (counts[b.category] ?? 0) + 1;
  return counts;
})();

export default function LibraryPage() {
  const [category, setCategory] = useState<string>(ALL);
  const [search, setSearch] = useState("");

  return (
    <PageShell className="py-12">
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold tracking-tight">블록 라이브러리</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          {promptBlocks.length}개의 프롬프트 블록을 둘러보세요. 블록팩 편집 화면에서 원하는 블록을 추가할 수 있어요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[196px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <p className="mb-2 hidden px-3 text-[11px] font-medium uppercase tracking-wide text-muted lg:block">
            카테고리
          </p>
          <CategorySidebar
            categories={UI_CATEGORIES}
            active={category}
            counts={categoryCounts}
            onSelect={setCategory}
            className="flex-row overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          />
        </aside>
        <section className="min-w-0">
          <BlockLibrary
            blocks={promptBlocks}
            category={category}
            search={search}
            onSearchChange={setSearch}
          />
        </section>
      </div>
    </PageShell>
  );
}
