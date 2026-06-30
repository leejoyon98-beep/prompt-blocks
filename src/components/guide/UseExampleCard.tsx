"use client";

import { useState } from "react";

type UseExampleCardProps = {
  title: string;
  command: string;
  longRequest: string[];
};

export function UseExampleCard({ title, command, longRequest }: UseExampleCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="group relative min-h-[186px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-background p-5 [word-break:keep-all] transition-colors hover:border-border-strong sm:min-h-[210px]">
      <div className="flex h-full flex-col">
        <h3 className="max-w-[520px] text-[18px] font-semibold leading-[1.35] text-foreground [text-wrap:balance]">
          {title}
        </h3>
        <p className="mt-5 inline-flex w-fit max-w-full rounded-[var(--radius-btn)] border border-border bg-subtle px-3 py-2 font-mono text-[14px] font-medium leading-[1.35] text-foreground [word-break:keep-all]">
          {command}
        </p>
        <button
          type="button"
          className="mt-auto inline-flex w-fit pt-5 text-[12px] font-medium text-muted hover:text-foreground md:hidden"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "간단히 보기" : "자세히 보기"}
        </button>
      </div>

      <div
        className={[
          "pointer-events-none absolute inset-0 overflow-y-auto bg-background p-5 opacity-0 transition-opacity duration-150 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100",
          expanded ? "pointer-events-auto opacity-100" : "",
        ].join(" ")}
        aria-hidden={!expanded}
      >
        <p className="text-[13px] font-semibold leading-[1.45] text-foreground">원래는 이렇게 길게 써야 해요</p>
        <div className="mt-3 space-y-1 text-[14px] leading-[1.55] text-muted">
          {longRequest.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-5">
          <p className="text-[12px] font-medium text-muted">짧게 쓰면:</p>
          <p className="mt-2 inline-flex w-fit max-w-full rounded-[var(--radius-btn)] border border-border bg-subtle px-3 py-2 font-mono text-[14px] font-medium leading-[1.35] text-foreground">
            {command}:
          </p>
        </div>
        <button
          type="button"
          className="mt-4 inline-flex w-fit text-[12px] font-medium text-muted hover:text-foreground md:hidden"
          onClick={() => setExpanded(false)}
        >
          간단히 보기
        </button>
      </div>
    </article>
  );
}
