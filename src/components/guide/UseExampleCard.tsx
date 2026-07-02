"use client";

import { useState } from "react";

type UseExampleCardProps = {
  command: string;
  shortRequest: string;
  longRequest: string[];
};

export function UseExampleCard({ command, shortRequest, longRequest }: UseExampleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleOnTouch = () => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      setExpanded((current) => !current);
    }
  };

  return (
    <article
      className="group min-h-[150px] cursor-pointer rounded-[var(--radius-card)] border border-border bg-background p-5 [word-break:keep-all] transition-colors hover:border-border-strong md:cursor-default"
      onClick={toggleOnTouch}
    >
      <div className="flex h-full flex-col">
        <p className="font-mono text-[13px] font-medium leading-[1.7] text-foreground">{command}</p>

        <div className="mt-3">
          <p
            className={[
              "text-[13px] leading-[1.7] text-muted transition-opacity md:group-hover:hidden",
              expanded ? "hidden" : "",
            ].join(" ")}
          >
            {shortRequest}
          </p>
          <div
            className={[
              "hidden space-y-1 text-[13px] leading-[1.7] text-muted transition-opacity md:group-hover:block",
              expanded ? "block" : "",
            ].join(" ")}
          >
            {longRequest.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
