"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";

export default function LibraryPage() {
  const router = useRouter();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;
    router.replace("/packs/new");
  }, [router]);

  return (
    <PageShell className="py-20">
      <div className="rounded-[var(--radius-card)] border border-border px-6 py-14 text-center">
        <p className="text-[15px] font-medium text-foreground">블록팩 조립 화면을 여는 중이에요.</p>
        <p className="mt-1.5 text-[13px] text-muted">
          새 블록팩을 만들 수 있는 빈 조립 화면으로 이동하고 있어요.
        </p>
      </div>
    </PageShell>
  );
}
