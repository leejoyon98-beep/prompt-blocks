"use client";

import { useEffect, useState } from "react";

type TypewriterPromptBoxProps = {
  phrases: string[];
};

export function TypewriterPromptBox({ phrases }: TypewriterPromptBoxProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "holding" | "deleting">("idle");

  const currentPhrase = phrases[phraseIndex] ?? "";
  const visibleText = currentPhrase.slice(0, visibleLength);

  useEffect(() => {
    if (phrases.length === 0) return;

    const delays = {
      idle: 520,
      typing: 92,
      holding: 1050,
      deleting: 46,
    };

    const timer = window.setTimeout(() => {
      if (phase === "idle") {
        setPhase("typing");
        return;
      }

      if (phase === "typing") {
        if (visibleLength < currentPhrase.length) {
          setVisibleLength((length) => length + 1);
          return;
        }

        setPhase("holding");
        return;
      }

      if (phase === "holding") {
        setPhase("deleting");
        return;
      }

      if (visibleLength > 0) {
        setVisibleLength((length) => length - 1);
        return;
      }

      setPhraseIndex((index) => (index + 1) % phrases.length);
      setPhase("idle");
    }, delays[phase]);

    return () => window.clearTimeout(timer);
  }, [currentPhrase.length, phase, phrases.length, visibleLength]);

  return (
    <div className="mt-8 w-full">
      <div className="rounded-[var(--radius-card)] border border-border bg-background px-4 py-4 shadow-[0_1px_0_rgba(10,10,10,0.03)] sm:px-5">
        <div
          aria-label="반복해서 입력하는 요청 예시"
          className="flex min-h-8 items-center text-[15px] font-medium leading-[1.7] text-foreground [word-break:keep-all]"
        >
          <span className="whitespace-nowrap">{visibleText}</span>
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-[1.25em] w-px animate-pulse bg-foreground align-middle"
          />
        </div>
      </div>
    </div>
  );
}
