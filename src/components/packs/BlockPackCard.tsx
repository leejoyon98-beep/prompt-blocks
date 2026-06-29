"use client";

import Link from "next/link";
import type { BlockPack } from "@/types";
import { Button } from "@/components/common/Button";
import { CopyRegisterButton } from "./CopyRegisterButton";
import { formatDate } from "@/lib/utils";

export function BlockPackCard({
  pack,
  onDuplicate,
  onDelete,
}: {
  pack: BlockPack;
  onDuplicate: (id: string) => void;
  onDelete: (pack: BlockPack) => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-background p-4 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-semibold tracking-tight">{pack.name}</h3>
        <span className="shrink-0 text-[12px] tabular-nums text-muted">
          블록 {pack.blockIds.length} · 태그 {pack.tagIds.length}
        </span>
      </div>
      <p className="mt-1.5 line-clamp-2 min-h-[20px] text-[13px] leading-relaxed text-muted">
        {pack.description || "설명 없음"}
      </p>

      <div className="mt-3 text-[11px] text-muted/80">마지막 수정 {formatDate(pack.updatedAt)}</div>

      <div className="mt-auto flex items-center gap-1.5 pt-4">
        <Link
          href={`/packs/${pack.id}`}
          className="inline-flex h-8 items-center justify-center rounded-[var(--radius-btn)] border border-border bg-background px-3 text-[13px] font-medium hover:border-border-strong hover:bg-subtle"
        >
          열기
        </Link>
        <CopyRegisterButton pack={pack} />
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => onDuplicate(pack.id)}>
            복제
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(pack)}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
