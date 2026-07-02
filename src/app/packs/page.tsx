"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isPackAuthRequiredError, usePacks } from "@/lib/usePacks";
import { getSupabase } from "@/lib/supabase";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/common/Button";
import { BlockPackCard } from "@/components/packs/BlockPackCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useToast } from "@/components/common/Toast";
import Link from "next/link";
import type { BlockPack } from "@/types";

export default function PacksPage() {
  const router = useRouter();
  const { packs, ready, createPack, updatePack, deletePack } = usePacks();
  const { show } = useToast();
  const [toDelete, setToDelete] = useState<BlockPack | null>(null);
  const [authAllowed, setAuthAllowed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      queueMicrotask(() => {
        setAuthAllowed(true);
        setAuthChecked(true);
      });
      return;
    }

    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error) console.error("[packs] user lookup failed", error);
      const allowed = Boolean(data.user);
      setAuthAllowed(allowed);
      setAuthChecked(true);
      if (!allowed) {
        show("내 블록팩을 보려면 로그인해주세요.");
        window.dispatchEvent(new Event("prompt-auth-open"));
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthAllowed(Boolean(session?.user));
      setAuthChecked(true);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [show]);

  const handleCreate = async () => {
    try {
      const pack = await createPack();
      router.push(`/packs/${pack.id}`);
    } catch (error) {
      console.error("[packs] create failed", error);
      if (isPackAuthRequiredError(error)) {
        show("내 블록팩에 저장하려면 먼저 로그인해주세요.");
        window.dispatchEvent(new Event("prompt-auth-open"));
        return;
      }
      show("블록팩을 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <PageShell className="py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold tracking-tight">내 블록팩</h1>
        <Button variant="primary" size="md" onClick={handleCreate}>
          새 블록팩 만들기
        </Button>
      </div>

      {!authChecked ? null : !authAllowed ? (
        <EmptyState
          title="로그인이 필요해요."
          description="내 블록팩을 저장하고 불러오려면 먼저 로그인해주세요."
        >
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.dispatchEvent(new Event("prompt-auth-open"))}
          >
            로그인하기
          </Button>
          <Link href="/packs/new">
            <Button variant="outline" size="sm">
              저장 없이 조립해보기
            </Button>
          </Link>
        </EmptyState>
      ) : !ready ? null : packs.length === 0 ? (
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
              onUpdate={updatePack}
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
