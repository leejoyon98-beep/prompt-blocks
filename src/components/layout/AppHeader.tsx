"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthButton } from "@/components/auth/AuthButton";
import { useToast } from "@/components/common/Toast";
import { getSupabase } from "@/lib/supabase";

const navLinkClass =
  "whitespace-nowrap rounded-[var(--radius-btn)] px-3 py-1.5 text-muted hover:bg-subtle hover:text-foreground";
const mobileNavClass =
  "block w-full whitespace-nowrap rounded-[var(--radius-btn)] px-3 py-2 text-left text-[14px] text-foreground hover:bg-subtle";

export function AppHeader() {
  const router = useRouter();
  const { show } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMyPacks = async () => {
    try {
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!data.user) {
          show("내 블록팩을 보려면 로그인해주세요.");
          window.dispatchEvent(new Event("prompt-auth-open"));
          return;
        }
      }

      router.push("/packs");
    } catch (error) {
      console.error("[nav] open my packs failed", error);
      show("내 블록팩을 열지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-ink text-[13px] font-semibold text-white">
            B
          </span>
          <span className="truncate whitespace-nowrap text-[15px] font-semibold tracking-tight">프롬프트 블록팩</span>
        </Link>
        <nav className="hidden items-center gap-1 text-[13px] md:flex">
          <Link href="/guide" className={navLinkClass}>
            사용 가이드
          </Link>
          <button type="button" onClick={() => router.push("/packs/new")} className={navLinkClass}>
            블록 라이브러리
          </button>
          <button type="button" onClick={openMyPacks} className={navLinkClass}>
            내 블록팩
          </button>
          <span className="mx-1 h-4 w-px bg-border" />
          <AuthButton />
        </nav>
        <button
          type="button"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-btn)] border border-border bg-background text-[18px] leading-none text-foreground md:hidden"
        >
          {mobileOpen ? "×" : "☰"}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-border bg-background px-5 py-3 md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
            <Link href="/guide" className={mobileNavClass} onClick={() => setMobileOpen(false)}>
              사용 가이드
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                router.push("/packs/new");
              }}
              className={mobileNavClass}
            >
              블록 라이브러리
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openMyPacks();
              }}
              className={mobileNavClass}
            >
              내 블록팩
            </button>
            <div className="mt-2 border-t border-border pt-3">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
