"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePacks } from "@/lib/usePacks";
import { promptBlocks, blockById } from "@/data/promptBlocks";
import { UI_CATEGORIES } from "@/data/categories";
import type { PromptBlock } from "@/types";
import { CategorySidebar, ALL } from "@/components/blocks/CategorySidebar";
import { BlockLibrary } from "@/components/blocks/BlockLibrary";
import { CurrentPackPanel } from "./CurrentPackPanel";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/common/Button";

const categoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = { [ALL]: promptBlocks.length };
  for (const c of UI_CATEGORIES) counts[c] = 0;
  for (const b of promptBlocks) counts[b.category] = (counts[b.category] ?? 0) + 1;
  return counts;
})();

export function BlockPackEditor({ packId }: { packId: string }) {
  const router = useRouter();
  const { packs, ready, updatePack, deletePack, duplicatePack } = usePacks();
  const [category, setCategory] = useState<string>(ALL);
  const [search, setSearch] = useState("");
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
  const selectedIds = useMemo(() => new Set(pack?.blockIds ?? []), [pack]);

  if (!ready) {
    return <div className="px-6 py-20 text-center text-[13px] text-muted">불러오는 중…</div>;
  }

  if (!pack) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-16">
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

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6">
      <div className="mb-4 flex items-center gap-2 text-[12px] text-muted">
        <Link href="/packs" className="hover:text-foreground">
          내 블록팩
        </Link>
        <span>/</span>
        <span className="text-foreground">{pack.name || "이름 없는 블록팩"}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[196px_minmax(0,1fr)_360px]">
        {/* Left: categories */}
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

        {/* Center: library */}
        <section className="min-w-0">
          <BlockLibrary
            blocks={promptBlocks}
            category={category}
            search={search}
            onSearchChange={setSearch}
            selectedIds={selectedIds}
            onAdd={addBlock}
          />
        </section>

        {/* Right: current pack */}
        <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <div className="rounded-[var(--radius-card)] border border-border bg-background p-4">
            <CurrentPackPanel
              pack={pack}
              blocks={orderedBlocks}
              onRename={(v) => updatePack(pack.id, { name: v })}
              onDescription={(v) => updatePack(pack.id, { description: v })}
              onMove={moveBlock}
              onRemove={removeBlock}
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
