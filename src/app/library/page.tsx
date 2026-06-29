"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { useToast } from "@/components/common/Toast";
import { usePacks } from "@/lib/usePacks";

export default function LibraryPage() {
  const router = useRouter();
  const { show } = useToast();
  const { packs, ready, createPack } = usePacks();
  const handled = useRef(false);

  useEffect(() => {
    if (!ready || handled.current) return;
    handled.current = true;

    const openAssembly = async () => {
      try {
        if (packs.length > 0) {
          const latest = [...packs].sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )[0];
          router.replace(`/packs/${latest.id}`);
          return;
        }

        const pack = await createPack();
        router.replace(`/packs/${pack.id}`);
      } catch (error) {
        console.error("[library] open assembly failed", error);
        show("블록팩 조립 화면을 열지 못했어요. 잠시 후 다시 시도해주세요.");
        handled.current = false;
      }
    };

    openAssembly();
  }, [createPack, packs, ready, router, show]);

  return (
    <PageShell className="py-20">
      <div className="rounded-[var(--radius-card)] border border-border px-6 py-14 text-center">
        <p className="text-[15px] font-medium text-foreground">블록팩 조립 화면을 여는 중이에요.</p>
        <p className="mt-1.5 text-[13px] text-muted">
          최근 수정한 블록팩으로 이동하거나, 블록팩이 없으면 새 블록팩을 만들고 있어요.
        </p>
      </div>
    </PageShell>
  );
}
