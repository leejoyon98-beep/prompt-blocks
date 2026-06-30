"use client";

import { useState } from "react";

type UseExampleCardProps = {
  command: string;
  request: string;
  details: string[];
};

export function UseExampleCard({ command, request, details }: UseExampleCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="group relative min-h-[178px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-background p-5 [word-break:keep-all] transition-colors hover:border-border-strong sm:min-h-[190px]">
      <div className="flex h-full flex-col">
        <p className="text-[13px] font-medium leading-[1.55] text-foreground [word-break:keep-all]">{command}</p>
        <p className="mt-3 text-[13px] leading-[1.6] text-muted">{request}</p>
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
        <p className="text-[13px] font-medium leading-[1.55] text-foreground">{command}</p>
        <ul className="mt-3 space-y-2 text-[12px] leading-[1.55] text-muted">
          {details.map((detail) => (
            <li key={detail} className="flex gap-2">
              <span className="mt-[0.58em] h-1 w-1 shrink-0 rounded-full bg-muted/60" aria-hidden="true" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
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
