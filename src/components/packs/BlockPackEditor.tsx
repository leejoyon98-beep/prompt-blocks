"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePacks } from "@/lib/usePacks";
import { promptBlocks, blockById } from "@/data/promptBlocks";
import { promptTags, tagById, TAG_CATEGORIES } from "@/data/promptTags";
import { normalizeCategory, UI_CATEGORIES } from "@/data/categories";
import type { PromptBlock, PromptTag } from "@/types";
import { CategorySidebar, ALL } from "@/components/blocks/CategorySidebar";
import { BlockLibrary } from "@/components/blocks/BlockLibrary";
import { TagLibrary } from "@/components/tags/TagLibrary";
import { CurrentPackPanel } from "./CurrentPackPanel";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
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
  const router = useRouter();
  const { packs, ready, updatePack, deletePack, duplicatePack } = usePacks();
  const [mode, setMode] = useState<LibraryMode>("blocks");
  const [blockCategory, setBlockCategory] = useState<string>(ALL);
  const [tagCategory, setTagCategory] = useState<string>(ALL);
  const [blockSearch, setBlockSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      <div className="mx-auto max-w-[1440px] px-6 py-16">
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

  const categories = mode === "blocks" ? UI_CATEGORIES : TAG_CATEGORIES;
  const activeCategory = mode === "blocks" ? blockCategory : tagCategory;
  const counts = mode === "blocks" ? blockCategoryCounts : tagCategoryCounts;
  const onSelectCategory = mode === "blocks" ? setBlockCategory : setTagCategory;

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-6">
      <div className="mb-4 flex items-center gap-2 text-[12px] text-muted">
        <Link href="/packs" className="hover:text-foreground">
          내 블록팩
        </Link>
        <span>/</span>
        <span className="text-foreground">{pack.name || "이름 없는 블록팩"}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[180px_minmax(0,1fr)_320px] 2xl:grid-cols-[180px_minmax(720px,1fr)_320px]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
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

        <section className="min-w-0">
          <div className="mb-4 grid grid-cols-2 gap-1 rounded-[var(--radius-card)] border border-border bg-subtle p-1">
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

        <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <div className="rounded-[var(--radius-card)] border border-border bg-background p-4">
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
              onDuplicate={() => {
                const copy = duplicatePack(pack.id);
                if (copy) router.push(`/packs/${copy.id}`);
              }}
              onDelete={() => setConfirmDelete(true)}
            />
          </div>
        </aside>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="이 블록팩을 삭제할까요?"
        description={`"${pack.name}" 블록팩이 삭제됩니다. 되돌릴 수 없어요.`}
        onConfirm={() => {
          deletePack(pack.id);
          router.push("/packs");
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
