"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePacks } from "@/lib/usePacks";
import { useToast } from "@/components/common/Toast";
import { promptBlocks, blockById } from "@/data/promptBlocks";
import { promptTags, tagById, TAG_CATEGORIES } from "@/data/promptTags";
import { normalizeCategory, UI_CATEGORIES } from "@/data/categories";
import type { PromptBlock, PromptTag } from "@/types";
import { CategorySidebar, ALL } from "@/components/blocks/CategorySidebar";
import { BlockLibrary } from "@/components/blocks/BlockLibrary";
import { TagLibrary } from "@/components/tags/TagLibrary";
import { CurrentPackPanel } from "./CurrentPackPanel";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

const blockCategoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = { [ALL]: promptBlocks.length };
  for (const c of UI_CATEGORIES) counts[c] = 0;
  for (const b of promptBlocks) {
    const category = normalizeCategory(b.category);
    counts[category] = (counts[category] ?? 0) + 1;
  }
  return counts;
})();

const tagCategoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = { [ALL]: promptTags.length };
  for (const c of TAG_CATEGORIES) counts[c] = 0;
  for (const tag of promptTags) counts[tag.category] = (counts[tag.category] ?? 0) + 1;
  return counts;
})();

type LibraryMode = "blocks" | "tags";

export function BlockPackEditor({ packId }: { packId: string }) {
  const { packs, ready, updatePack } = usePacks();
  const { show } = useToast();
  const [mode, setMode] = useState<LibraryMode>("blocks");
  const [blockCategory, setBlockCategory] = useState<string>(ALL);
  const [tagCategory, setTagCategory] = useState<string>(ALL);
  const [blockSearch, setBlockSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");

  const pack = packs.find((p) => p.id === packId);

  const orderedBlocks = useMemo(
    () =>
      pack
        ? pack.blockIds
            .map((id) => blockById.get(id))
            .filter((b): b is PromptBlock => b != null)
        : [],
    [pack]
  );
  const orderedTags = useMemo(
    () =>
      pack
        ? (pack.tagIds ?? [])
            .map((id) => tagById.get(id))
            .filter((tag): tag is PromptTag => tag != null)
        : [],
    [pack]
  );
  const selectedBlockIds = useMemo(() => new Set(pack?.blockIds ?? []), [pack]);
  const selectedTagIds = useMemo(() => new Set(pack?.tagIds ?? []), [pack]);

  if (!ready) {
    return <div className="px-6 py-20 text-center text-[13px] text-muted">불러오는 중...</div>;
  }

  if (!pack) {
    return (
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10">
        <EmptyState
          title="블록팩을 찾을 수 없어요."
          description="삭제되었거나 잘못된 주소일 수 있어요."
        >
          <Link href="/packs">
            <Button variant="primary" size="sm">
              내 블록팩으로
            </Button>
          </Link>
        </EmptyState>
      </div>
    );
  }

  const addBlock = (id: number) => {
    if (pack.blockIds.includes(id)) return;
    updatePack(pack.id, { blockIds: [...pack.blockIds, id] });
  };
  const removeBlock = (id: number) =>
    updatePack(pack.id, { blockIds: pack.blockIds.filter((b) => b !== id) });
  const moveBlock = (index: number, dir: -1 | 1) => {
    const next = [...pack.blockIds];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updatePack(pack.id, { blockIds: next });
  };

  const addTag = (id: string) => {
    const tagIds = pack.tagIds ?? [];
    if (tagIds.includes(id)) return;
    updatePack(pack.id, { tagIds: [...tagIds, id] });
  };
  const removeTag = (id: string) =>
    updatePack(pack.id, { tagIds: (pack.tagIds ?? []).filter((tagId) => tagId !== id) });
  const moveTag = (index: number, dir: -1 | 1) => {
    const next = [...(pack.tagIds ?? [])];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updatePack(pack.id, { tagIds: next });
  };

  const savePack = async () => {
    const trimmedName = pack.name.trim();
    if (!trimmedName) {
      show("블록팩 이름을 입력해주세요.");
      return;
    }

    const ok = await updatePack(pack.id, {
      name: trimmedName,
      description: pack.description.trim(),
      blockIds: [...pack.blockIds],
      tagIds: [...(pack.tagIds ?? [])],
    });

    if (!ok) {
      console.error("[packs] explicit save failed", { packId: pack.id });
      show("블록팩 저장에 실패했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    show("내 블록팩에 저장되었어요.");
  };

  const categories = mode === "blocks" ? UI_CATEGORIES : TAG_CATEGORIES;
  const activeCategory = mode === "blocks" ? blockCategory : tagCategory;
  const counts = mode === "blocks" ? blockCategoryCounts : tagCategoryCounts;
  const onSelectCategory = mode === "blocks" ? setBlockCategory : setTagCategory;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-6 sm:px-10">
      <div className="mb-4 flex items-center gap-2 text-[12px] text-muted">
        <Link href="/packs" className="hover:text-foreground">
          내 블록팩
        </Link>
        <span>/</span>
        <span className="text-foreground">{pack.name || "이름 없는 블록팩"}</span>
      </div>

      <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[180px_minmax(0,1fr)_320px] min-[1400px]:grid-cols-[180px_minmax(760px,1fr)_320px] xl:gap-8">
        <aside className="w-full min-w-0 lg:sticky lg:top-20 lg:w-[180px] lg:self-start">
          <p className="mb-2 hidden px-3 text-[11px] font-medium uppercase text-muted lg:block">
            카테고리
          </p>
          <CategorySidebar
            categories={categories}
            active={activeCategory}
            counts={counts}
            onSelect={onSelectCategory}
            className="flex-row overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          />
        </aside>

        <section className="w-full min-w-0">
          <div className="mb-4 grid w-full grid-cols-2 gap-1 rounded-[var(--radius-card)] border border-border bg-subtle p-1">
            <button
              onClick={() => setMode("blocks")}
              className={cn(
                "h-9 rounded-[var(--radius-btn)] text-[13px] font-medium transition-colors",
                mode === "blocks" ? "bg-background text-foreground shadow-sm" : "text-muted hover:text-foreground"
              )}
            >
              프롬프트 블록
            </button>
            <button
              onClick={() => setMode("tags")}
              className={cn(
                "h-9 rounded-[var(--radius-btn)] text-[13px] font-medium transition-colors",
                mode === "tags" ? "bg-background text-foreground shadow-sm" : "text-muted hover:text-foreground"
              )}
            >
              조각 태그
            </button>
          </div>

          {mode === "blocks" ? (
            <BlockLibrary
              blocks={promptBlocks}
              category={blockCategory}
              search={blockSearch}
              onSearchChange={setBlockSearch}
              selectedIds={selectedBlockIds}
              onAdd={addBlock}
            />
          ) : (
            <TagLibrary
              tags={promptTags}
              category={tagCategory}
              search={tagSearch}
              onSearchChange={setTagSearch}
              selectedIds={selectedTagIds}
              onAdd={addTag}
            />
          )}
        </section>

        <aside className="w-full min-w-0 lg:sticky lg:top-20 lg:w-[320px] lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <div className="w-full rounded-[var(--radius-card)] border border-border bg-background p-4">
            <CurrentPackPanel
              pack={pack}
              blocks={orderedBlocks}
              tags={orderedTags}
              onRename={(v) => updatePack(pack.id, { name: v })}
              onDescription={(v) => updatePack(pack.id, { description: v })}
              onMove={moveBlock}
              onRemove={removeBlock}
              onMoveTag={moveTag}
              onRemoveTag={removeTag}
              onSave={savePack}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
