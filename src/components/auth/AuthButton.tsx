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
  const [oauthLoading, setOauthLoading] = useState(false);
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

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("prompt-auth-open", onOpen);
    return () => window.removeEventListener("prompt-auth-open", onOpen);
  }, []);

  if (!supabase) return null;

  async function signInWithGoogle() {
    if (!supabase) return;
    setOauthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    setOauthLoading(false);
    if (error) show("Google 로그인 시작에 실패했어요: " + error.message);
  }

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
      show("로그인 링크 전송에 실패했어요: " + error.message);
      return;
    }
    setOpen(false);
    setInput("");
    show("로그인 링크를 이메일로 보냈어요. 메일함을 확인해주세요.");
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
        <div className="absolute right-0 top-full z-40 mt-2 w-72 rounded-[var(--radius-card)] border border-border bg-background p-3 shadow-sm">
          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={oauthLoading}
            className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-border bg-background py-2 text-[13px] font-medium text-foreground transition-colors hover:border-border-strong hover:bg-subtle disabled:opacity-40"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-[12px] font-semibold">
              G
            </span>
            {oauthLoading ? "Google로 이동 중..." : "Google로 계속하기"}
          </button>

          <div className="my-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[11px] text-muted">또는</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={sendLink}>
            <p className="mb-2 text-[12px] leading-relaxed text-muted">
              Google 로그인이 안 될 때만 이메일 링크를 사용하세요.
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
              {sending ? "보내는 중..." : "이메일 링크 받기"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
