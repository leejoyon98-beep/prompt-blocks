"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthButton } from "@/components/auth/AuthButton";
import { useToast } from "@/components/common/Toast";
import { getSupabase } from "@/lib/supabase";

const navLinkClass =
  "rounded-[var(--radius-btn)] px-3 py-1.5 text-muted hover:bg-subtle hover:text-foreground";

export function AppHeader() {
  const router = useRouter();
  const { show } = useToast();
  const [openingLibrary, setOpeningLibrary] = useState(false);

  const openBlockLibrary = async () => {
    if (openingLibrary) return;
    setOpeningLibrary(true);

    try {
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!data.user) {
          show("블록 라이브러리를 사용하려면 먼저 로그인해주세요.");
          window.dispatchEvent(new Event("prompt-auth-open"));
          return;
        }
      }

      router.push("/packs/new");
    } catch (error) {
      console.error("[nav] open block library failed", error);
      show("블록팩 조립 화면을 열지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setOpeningLibrary(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-ink text-[13px] font-semibold text-white">
            B
          </span>
          <span className="text-[15px] font-semibold tracking-tight">프롬프트 블록팩</span>
        </Link>
        <nav className="flex items-center gap-1 text-[13px]">
          <Link href="/guide" className={navLinkClass}>
            사용 가이드
          </Link>
          <button type="button" onClick={openBlockLibrary} disabled={openingLibrary} className={navLinkClass}>
            {openingLibrary ? "여는 중..." : "블록 라이브러리"}
          </button>
          <Link href="/packs" className={navLinkClass}>
            내 블록팩
          </Link>
          <span className="mx-1 h-4 w-px bg-border" />
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
