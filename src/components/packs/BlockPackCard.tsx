"use client";

import Link from "next/link";
import { useState } from "react";
import type { BlockPack } from "@/types";
import { Button } from "@/components/common/Button";
import { useToast } from "@/components/common/Toast";
import { CopyRegisterButton } from "./CopyRegisterButton";
import { formatDate } from "@/lib/utils";

export function BlockPackCard({
  pack,
  onUpdate,
  onDelete,
}: {
  pack: BlockPack;
  onUpdate: (
    id: string,
    patch: Partial<Pick<BlockPack, "name" | "description">>
  ) => Promise<boolean> | boolean;
  onDelete: (pack: BlockPack) => void;
}) {
  const { show } = useToast();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(pack.name);
  const [description, setDescription] = useState(pack.description);
  const [saving, setSaving] = useState(false);

  const closeEdit = () => {
    setName(pack.name);
    setDescription(pack.description);
    setEditing(false);
  };

  const saveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      show("블록팩 이름을 입력해주세요.");
      return;
    }
    setSaving(true);
    const ok = await onUpdate(pack.id, {
      name: trimmedName,
      description: description.trim(),
    });
    setSaving(false);
    if (!ok) {
      show("블록팩 정보를 저장하지 못했어요. 다시 시도해주세요.");
      return;
    }
    show("블록팩 정보를 수정했어요.");
    setEditing(false);
  };

  return (
    <>
      <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-background p-4 transition-colors hover:border-border-strong">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[14px] font-semibold tracking-tight">{pack.name}</h3>
          <span className="shrink-0 text-[12px] tabular-nums text-muted">
            블록 {pack.blockIds.length} · 태그 {(pack.tagIds ?? []).length}
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
            조립하기
          </Link>
          <CopyRegisterButton pack={pack} />
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              정보수정
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(pack)}>
              삭제
            </Button>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <form
            onSubmit={saveInfo}
            className="w-full max-w-md rounded-[var(--radius-card)] border border-border bg-background p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[16px] font-semibold tracking-tight">블록팩 정보수정</h2>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">
                  이름과 설명만 수정합니다. 블록 조립은 조립하기에서 계속할 수 있어요.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEdit}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-[16px] text-muted hover:bg-subtle hover:text-foreground"
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            <label className="mt-4 block text-[12px] font-medium text-muted" htmlFor={`pack-name-${pack.id}`}>
              블록팩 이름
            </label>
            <input
              id={`pack-name-${pack.id}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 h-9 w-full rounded-[var(--radius-btn)] border border-border bg-background px-3 text-[13px] outline-none focus:border-border-strong"
              autoFocus
            />

            <label
              className="mt-3 block text-[12px] font-medium text-muted"
              htmlFor={`pack-description-${pack.id}`}
            >
              블록팩 설명
            </label>
            <textarea
              id={`pack-description-${pack.id}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1.5 w-full resize-none rounded-[var(--radius-btn)] border border-border bg-background px-3 py-2 text-[13px] leading-relaxed outline-none focus:border-border-strong"
            />

            <div className="mt-5 flex items-center justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={closeEdit}>
                취소
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={saving}>
                {saving ? "저장 중..." : "저장"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
