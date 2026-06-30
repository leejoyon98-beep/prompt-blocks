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
import { useToast } from "@/components/common/Toast";
import { useState } from "react";
import type { BlockPack, RecommendedBlockPack } from "@/types";

export default function Home() {
  const router = useRouter();
  const { packs, ready, createPack, updatePack, deletePack, startFromRecommended } = usePacks();
  const { show } = useToast();
  const [toDelete, setToDelete] = useState<BlockPack | null>(null);

  const handleCreate = async () => {
    try {
      const pack = await createPack();
      router.push(`/packs/${pack.id}`);
    } catch (error) {
      console.error("[packs] create failed", error);
      show("블록팩을 만들지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };
  const handleStart = async (rec: RecommendedBlockPack) => {
    try {
      const pack = await startFromRecommended(rec);
      router.push(`/packs/${pack.id}`);
    } catch (error) {
      console.error("[packs] recommended start failed", error);
      show("블록팩을 만들지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <PageShell className="py-12">
      {/* Hero */}
      <section className="border-b border-border pb-3">
        <h1 className="max-w-2xl text-[40px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[48px]">
          프롬프트 블록을 골라
          <br />
          나만의 블록팩을 만드세요.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          자주 쓰는 AI 작업 방식을 블록팩으로 묶고,
          <br />
          내가 사용하는 AI에 붙여넣어 반복 작업을 빠르게 요청할 수 있어요.
        </p>
        <div className="mt-12 mb-3">
          <Link href="/guide" className="inline-flex text-[13px] font-medium text-foreground hover:underline">
            프롬프트 블록이 처음이라면? 사용 가이드 보기 →
          </Link>
        </div>
      </section>

      {/* Recommended */}
      <section id="recommended" className="scroll-mt-20 py-12">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-[20px] font-semibold tracking-tight">추천 블록팩</h2>
          <Link href="/templates" className="text-[13px] text-muted hover:text-foreground">
            모든 블록팩 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPacks.map((p) => (
            <RecommendedPackCard key={p.id} pack={p} onStart={handleStart} />
          ))}
          <Link
            href="/templates"
            className="flex h-full min-h-[218px] flex-col rounded-[var(--radius-card)] border border-border bg-background p-4 transition-colors hover:border-border-strong hover:bg-subtle/40"
          >
            <div>
              <h3 className="text-[14px] font-semibold tracking-tight">모든 블록팩 보기</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                상품기획, 리서치, 이미지 작업, 마케팅 등 목적별 기본 블록팩을 둘러보고 바로 시작해보세요.
              </p>
            </div>
            <div className="mt-auto pt-4">
              <span className="inline-flex h-8 items-center justify-center rounded-[var(--radius-btn)] bg-ink px-3 text-[13px] font-medium text-white">
                둘러보기
              </span>
            </div>
          </Link>
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
                onUpdate={updatePack}
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
