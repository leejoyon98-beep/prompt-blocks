"use client";

import { useState } from "react";

type UseExampleCardProps = {
  title: string;
  command: string;
  longRequest: string[];
};

export function UseExampleCard({ title, command, longRequest }: UseExampleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleOnTouch = () => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      setExpanded((current) => !current);
    }
  };

  return (
    <article
      className="group min-h-[186px] cursor-pointer rounded-[var(--radius-card)] border border-border bg-background p-5 [word-break:keep-all] transition-colors hover:border-border-strong sm:min-h-[210px] md:cursor-default"
      onClick={toggleOnTouch}
    >
      <div className="flex h-full flex-col">
        <h3 className="max-w-[520px] text-[18px] font-semibold leading-[1.35] text-foreground [text-wrap:balance]">
          {title}
        </h3>

        <div className="mt-5">
          <p
            className={[
              "inline-flex w-fit max-w-full font-mono text-[14px] font-medium leading-[1.45] text-foreground [word-break:keep-all] md:group-hover:hidden",
              expanded ? "hidden" : "",
            ].join(" ")}
          >
            {command}
          </p>
          <div
            className={[
              "hidden space-y-1 text-[14px] leading-[1.55] text-muted md:group-hover:block",
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
