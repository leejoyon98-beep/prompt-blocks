"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { isPackAuthRequiredError, usePacks } from "@/lib/usePacks";
import { useToast } from "@/components/common/Toast";
import { promptBlocks, blockById } from "@/data/promptBlocks";
import { promptTags, tagById, TAG_CATEGORIES } from "@/data/promptTags";
import { featuredPacks, recommendedPacks } from "@/data/recommendedPacks";
import { normalizeCategory, UI_CATEGORIES } from "@/data/categories";
import type { BlockPack, PromptBlock, PromptTag, RecommendedBlockPack } from "@/types";
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

function createDraftPack(template?: RecommendedBlockPack): BlockPack {
  const ts = new Date().toISOString();
  return {
    id: "__new__",
    name: template?.name ?? "새 블록팩",
    description: template?.description ?? "",
    blockIds: template ? [...template.blockIds] : [],
    tagIds: template ? [...(template.tagIds ?? [])] : [],
    createdAt: ts,
    updatedAt: ts,
  };
}

export function BlockPackEditor({
  packId,
  isNew = false,
}: {
  packId?: string;
  isNew?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { packs, ready, createPack, updatePack } = usePacks();
  const { show } = useToast();
  const templateId = isNew ? searchParams.get("template") : null;
  const templatePack = useMemo(
    () =>
      templateId
        ? [...featuredPacks, ...recommendedPacks].find((template) => template.id === templateId)
        : undefined,
    [templateId]
  );
  const [draftPack, setDraftPack] = useState<BlockPack>(() => createDraftPack(templatePack));
  const [mode, setMode] = useState<LibraryMode>("blocks");
  const [blockCategory, setBlockCategory] = useState<string>(ALL);
  const [tagCategory, setTagCategory] = useState<string>(ALL);
  const [blockSearch, setBlockSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");

  const pack = isNew ? draftPack : packs.find((p) => p.id === packId);

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

  if (!isNew && !ready) {
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

  const patchPack = (patch: Partial<Omit<BlockPack, "id" | "createdAt">>) => {
    if (isNew) {
      setDraftPack((prev) => ({ ...prev, ...patch, updatedAt: new Date().toISOString() }));
      return;
    }
    updatePack(pack.id, patch);
  };

  const addBlock = (id: number) => {
    if (pack.blockIds.includes(id)) return;
    patchPack({ blockIds: [...pack.blockIds, id] });
  };
  const removeBlock = (id: number) =>
    patchPack({ blockIds: pack.blockIds.filter((b) => b !== id) });

  const addTag = (id: string) => {
    const tagIds = pack.tagIds ?? [];
    if (tagIds.includes(id)) return;
    patchPack({ tagIds: [...tagIds, id] });
  };
  const removeTag = (id: string) =>
    patchPack({ tagIds: (pack.tagIds ?? []).filter((tagId) => tagId !== id) });

  const savePack = async () => {
    const trimmedName = pack.name.trim();
    if (!trimmedName) {
      show("블록팩 이름을 입력해주세요.");
      return;
    }

    try {
      if (isNew) {
        const created = await createPack({
          name: trimmedName,
          description: pack.description.trim(),
          blockIds: [...pack.blockIds],
          tagIds: [...(pack.tagIds ?? [])],
        });

        show("내 블록팩에 저장되었어요.");
        router.replace(`/packs/${created.id}`);
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
        show("블록팩을 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
        return;
      }

      show("내 블록팩에 저장되었어요.");
    } catch (error) {
      console.error("[packs] explicit save failed", error);
      if (isPackAuthRequiredError(error)) {
        show("비로그인 상태에서는 블록팩 사용만 가능해요. 저장하려면 로그인해주세요.");
        window.dispatchEvent(new Event("prompt-auth-open"));
        return;
      }
      show("블록팩을 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
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
        <span className="text-foreground">{isNew ? "새 블록팩 만들기" : pack.name || "이름 없는 블록팩"}</span>
      </div>

      <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[180px_minmax(0,1fr)_320px] min-[1400px]:grid-cols-[180px_minmax(760px,1fr)_320px] xl:gap-8">
        <aside className="w-full min-w-0 lg:sticky lg:top-20 lg:w-[180px] lg:self-start">
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
              onRename={(v) => patchPack({ name: v })}
              onDescription={(v) => patchPack({ description: v })}
              onRemove={removeBlock}
              onRemoveTag={removeTag}
              onSave={savePack}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
