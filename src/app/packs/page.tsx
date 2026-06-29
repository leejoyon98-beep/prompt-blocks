"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePacks } from "@/lib/usePacks";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/common/Button";
import { BlockPackCard } from "@/components/packs/BlockPackCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import Link from "next/link";
import type { BlockPack } from "@/types";

export default function PacksPage() {
  const router = useRouter();
  const { packs, ready, createPack, duplicatePack, deletePack } = usePacks();
  const [toDelete, setToDelete] = useState<BlockPack | null>(null);

  const handleCreate = () => {
    const pack = createPack();
    router.push(`/packs/${pack.id}`);
  };

  return (
    <PageShell className="py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold tracking-tight">내 블록팩</h1>
        <Button variant="primary" size="md" onClick={handleCreate}>
          새 블록팩 만들기
        </Button>
      </div>

      {!ready ? null : packs.length === 0 ? (
        <EmptyState
          title="아직 만든 블록팩이 없어요."
          description={"추천 블록팩으로 시작하거나 새 블록팩을 만들어보세요."}
        >
          <Button variant="primary" size="sm" onClick={handleCreate}>
            새 블록팩 만들기
          </Button>
          <Link href="/#recommended">
            <Button variant="outline" size="sm">
              추천 블록팩 보기
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((p) => (
            <BlockPackCard
              key={p.id}
              pack={p}
              onDuplicate={(id) => duplicatePack(id)}
              onDelete={(pack) => setToDelete(pack)}
            />
          ))}
        </div>
      )}

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
