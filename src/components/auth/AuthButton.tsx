"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useToast } from "@/components/common/Toast";

export function AuthButton() {
  const supabase = getSupabase();
  const { show } = useToast();
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setEmail(session?.user?.email ?? null)
    );
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!supabase) return null;

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !supabase) return;
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: input.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    setSending(false);
    if (error) {
      show("로그인 링크 전송 실패: " + error.message);
      return;
    }
    setOpen(false);
    setInput("");
    show("로그인 링크를 이메일로 보냈어요. 메일함을 확인하세요.");
  }

  if (email) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden max-w-[160px] truncate text-[12px] text-muted sm:inline">{email}</span>
        <button
          onClick={() => supabase.auth.signOut()}
          className="rounded-[var(--radius-btn)] px-3 py-1.5 text-[13px] text-muted hover:bg-subtle hover:text-foreground"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-[var(--radius-btn)] bg-ink px-3 py-1.5 text-[13px] font-medium text-white hover:bg-ink/90"
      >
        로그인
      </button>
      {open && (
        <form
          onSubmit={sendLink}
          className="absolute right-0 top-full z-40 mt-2 w-72 rounded-[var(--radius-card)] border border-border bg-background p-3 shadow-sm"
        >
          <p className="mb-2 text-[12px] leading-relaxed text-muted">
            이메일을 입력하면 로그인 링크를 보내드려요. 링크를 누르면 로그인돼요.
          </p>
          <input
            type="email"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="you@example.com"
            className="h-9 w-full rounded-[var(--radius-btn)] border border-border bg-background px-3 text-[13px] outline-none focus:border-border-strong"
          />
          <button
            type="submit"
            disabled={sending}
            className="mt-2 w-full rounded-[var(--radius-btn)] bg-ink py-2 text-[13px] font-medium text-white hover:bg-ink/90 disabled:opacity-40"
          >
            {sending ? "보내는 중…" : "로그인 링크 보내기"}
          </button>
        </form>
      )}
    </div>
  );
}
