import Link from "next/link";
import { AuthButton } from "@/components/auth/AuthButton";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-ink text-[13px] font-semibold text-white">
            B
          </span>
          <span className="text-[15px] font-semibold tracking-tight">프롬프트 블록팩</span>
        </Link>
        <nav className="flex items-center gap-1 text-[13px]">
          <Link href="/packs" className="rounded-[var(--radius-btn)] px-3 py-1.5 text-muted hover:bg-subtle hover:text-foreground">
            내 블록팩
          </Link>
          <Link href="/library" className="rounded-[var(--radius-btn)] px-3 py-1.5 text-muted hover:bg-subtle hover:text-foreground">
            블록 라이브러리
          </Link>
          <span className="mx-1 h-4 w-px bg-border" />
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
