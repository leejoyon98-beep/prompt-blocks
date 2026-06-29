"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePacks } from "@/lib/usePacks";
import { featuredPacks } from "@/data/recommendedPacks";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/common/Button";
import { RecommendedPackCard } from "@/components/packs/RecommendedPackCard";
import { BlockPackCard } from "@/components/packs/BlockPackCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useState } from "react";
import type { BlockPack, RecommendedBlockPack } from "@/types";

export default function Home() {
  const router = useRouter();
  const { packs, ready, createPack, duplicatePack, deletePack, startFromRecommended } = usePacks();
  const [toDelete, setToDelete] = useState<BlockPack | null>(null);

  const handleCreate = () => {
    const pack = createPack();
    router.push(`/packs/${pack.id}`);
  };
  const handleStart = (rec: RecommendedBlockPack) => {
    const pack = startFromRecommended(rec);
    router.push(`/packs/${pack.id}`);
  };

  return (
    <PageShell className="py-12">
      {/* Hero */}
      <section className="border-b border-border pb-12">
        <h1 className="max-w-2xl text-[40px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[48px]">
          프롬프트 블록을 골라
          <br />
          나만의 블록팩을 만드세요.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          자주 쓰는 AI 작업 방식을 블록팩으로 등록하고, 내가 사용하는 AI에 붙여넣어 사용할 수 있어요.
        </p>
        <div className="mt-7 flex items-center gap-2">
          <Button variant="primary" size="md" onClick={handleCreate}>
            새 블록팩 만들기
          </Button>
          <a href="#recommended">
            <Button variant="ghost" size="md">
              추천 블록팩 보기
            </Button>
          </a>
        </div>
      </section>

      {/* Recommended */}
      <section id="recommended" className="scroll-mt-20 py-12">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-[20px] font-semibold tracking-tight">추천 블록팩</h2>
          <span className="text-[12px] text-muted">목적에 맞는 세트로 바로 시작</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPacks.map((p) => (
            <RecommendedPackCard key={p.id} pack={p} onStart={handleStart} />
          ))}
        </div>
      </section>

      {/* My packs */}
      <section className="border-t border-border py-12">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-[20px] font-semibold tracking-tight">내 블록팩</h2>
          <Link href="/packs" className="text-[13px] text-muted hover:text-foreground">
            전체 보기
          </Link>
        </div>

        {!ready ? null : packs.length === 0 ? (
          <EmptyState
            title="아직 만든 블록팩이 없어요."
            description={"추천 블록팩으로 시작하거나 새 블록팩을 만들어보세요."}
          >
            <Button variant="primary" size="sm" onClick={handleCreate}>
              새 블록팩 만들기
            </Button>
            <a href="#recommended">
              <Button variant="outline" size="sm">
                추천 블록팩 보기
              </Button>
            </a>
          </EmptyState>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {packs.slice(0, 6).map((p) => (
              <BlockPackCard
                key={p.id}
                pack={p}
                onDuplicate={(id) => duplicatePack(id)}
                onDelete={(pack) => setToDelete(pack)}
              />
            ))}
          </div>
        )}
      </section>

      <ConfirmDialog
        open={toDelete != null}
        title="이 블록팩을 삭제할까요?"
        description={toDelete ? `"${toDelete.name}" 블록팩이 삭제됩니다.` : undefined}
        onConfirm={() => {
          if (toDelete) deletePack(toDelete.id);
          setToDelete(null);
        }}
        onCancel={() => setToDelete(null)}
      />
    </PageShell>
  );
}
