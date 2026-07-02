"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/common/Button";
import { useToast } from "@/components/common/Toast";
import { SearchInput } from "@/components/blocks/SearchInput";
import { recommendedPacks } from "@/data/recommendedPacks";
import { blockById } from "@/data/promptBlocks";
import { tagById } from "@/data/promptTags";
import { CATEGORY_ORDER, normalizeCategory } from "@/data/categories";
import { usePacks } from "@/lib/usePacks";
import type { RecommendedBlockPack } from "@/types";
import { cn } from "@/lib/utils";

const filterKeywords: Record<string, string[]> = {
  "범용 작업": ["범용 작업", "업무", "직장", "메일", "회의", "상사"],
  "기획/보고": ["기획", "보고", "계획", "문제정의", "실행"],
  상품기획: ["상품", "제품", "상세페이지", "기능", "구매"],
  "마케팅/브랜드": ["마케팅", "브랜드", "고객", "광고", "캠페인"],
  "사진/영상/비주얼": ["이미지", "사진", "영상", "비주얼", "프롬프트"],
  딥리서치: ["리서치", "조사", "근거", "출처", "시장"],
  "콘텐츠 제작": ["콘텐츠", "SNS", "카드뉴스", "릴스", "영상"],
  "분석/검토": ["분석", "검토", "리스크", "비교", "평가"],
  "자료 검색": ["자료", "검색", "요약", "배경", "트렌드"],
};

function packBlockNames(pack: RecommendedBlockPack): string[] {
  return pack.blockIds.map((id) => blockById.get(id)?.name).filter((name): name is string => Boolean(name));
}

function packTagNames(pack: RecommendedBlockPack): string[] {
  return (pack.tagIds ?? []).map((id) => tagById.get(id)?.tag).filter((name): name is string => Boolean(name));
}

function matchesFilter(pack: RecommendedBlockPack, filter: string) {
  if (filter === "전체") return true;
  const keywords = filterKeywords[filter] ?? [filter];
  const haystack = [pack.name, pack.description, normalizeCategory(pack.category), ...packBlockNames(pack), ...packTagNames(pack)]
    .join(" ")
    .toLowerCase();
  return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
}

function matchesSearch(pack: RecommendedBlockPack, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [pack.name, pack.description, normalizeCategory(pack.category), ...packBlockNames(pack), ...packTagNames(pack)]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export default function TemplatesPage() {
  const router = useRouter();
  const { show } = useToast();
  const { startFromRecommended } = usePacks();
  const [activeFilter, setActiveFilter] = useState("전체");
  const [search, setSearch] = useState("");
  const [startingId, setStartingId] = useState<string | null>(null);

  const filteredPacks = useMemo(
    () => recommendedPacks.filter((pack) => matchesFilter(pack, activeFilter) && matchesSearch(pack, search)),
    [activeFilter, search]
  );

  const handleStart = async (pack: RecommendedBlockPack) => {
    try {
      setStartingId(pack.id);
      const created = await startFromRecommended(pack);
      router.push(`/packs/${created.id}`);
    } catch (error) {
      console.error("[templates] start failed", error);
      show("블록팩을 만들지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setStartingId(null);
    }
  };

  return (
    <PageShell className="py-12">
      <header className="border-b border-border pb-8">
        <h1 className="text-[36px] font-semibold leading-tight tracking-tight">모든 블록팩</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          목적에 맞는 기본 블록팩을 골라 바로 시작할 수 있어요.
        </p>
      </header>

      <section className="py-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_ORDER.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "h-8 rounded-full border px-3 text-[12px] font-medium transition-colors",
                  activeFilter === filter
                    ? "border-ink bg-ink text-white"
                    : "border-border bg-background text-muted hover:border-border-strong hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="w-full lg:w-80">
            <SearchInput value={search} onChange={setSearch} />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold tracking-tight">기본 블록팩</h2>
          <span className="text-[12px] tabular-nums text-muted">{filteredPacks.length}개</span>
        </div>

        {filteredPacks.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-dashed border-border px-6 py-14 text-center">
            <p className="text-[15px] font-medium">검색 결과가 없어요.</p>
            <p className="mt-1.5 text-[13px] text-muted">다른 검색어나 필터로 다시 찾아보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPacks.map((pack) => (
              <TemplatePackCard
                key={pack.id}
                pack={pack}
                loading={startingId === pack.id}
                onStart={() => handleStart(pack)}
              />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

function TemplatePackCard({
  pack,
  loading,
  onStart,
}: {
  pack: RecommendedBlockPack;
  loading?: boolean;
  onStart: () => void;
}) {
  const names = packBlockNames(pack);
  const tagNames = packTagNames(pack);
  const tagCount = pack.tagIds?.length ?? 0;
  const category = normalizeCategory(pack.category);
  const hiddenCount = Math.max(0, names.length - 4) + Math.max(0, tagNames.length - 3);

  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-background p-4 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-semibold tracking-tight">{pack.name}</h3>
        <span className="shrink-0 rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">{category}</span>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{pack.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {names.slice(0, 4).map((name) => (
          <span key={name} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-foreground/80">
            {name}
          </span>
        ))}
        {tagNames.slice(0, 3).map((name) => (
          <span key={name} className="rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">
            {name}
          </span>
        ))}
        {hiddenCount > 0 && <span className="px-1 py-0.5 text-[11px] text-muted">+{hiddenCount}</span>}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <span className="text-[12px] tabular-nums text-muted">
          블록 {pack.blockIds.length} · 태그 {tagCount}
        </span>
        <Button variant="outline" size="sm" onClick={onStart} disabled={loading}>
          {loading ? "시작 중..." : "이 블록팩으로 시작"}
        </Button>
      </div>
    </div>
  );
}
