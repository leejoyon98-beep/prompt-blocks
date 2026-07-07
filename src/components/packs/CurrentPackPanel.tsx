"use client";

import type { BlockPack, PromptBlock, PromptTag } from "@/types";
import { Button } from "@/components/common/Button";
import { CopyRegisterButton } from "./CopyRegisterButton";
import { EmptyState } from "@/components/common/EmptyState";

export function CurrentPackPanel({
  pack,
  blocks,
  tags,
  onRename,
  onDescription,
  onRemove,
  onRemoveTag,
  onSave,
  isSaving = false,
}: {
  pack: BlockPack;
  blocks: PromptBlock[];
  tags: PromptTag[];
  onRename: (v: string) => void;
  onDescription: (v: string) => void;
  onRemove: (id: number) => void;
  onRemoveTag: (id: string) => void;
  onSave: () => Promise<void> | void;
  isSaving?: boolean;
}) {
  const hasItems = blocks.length + tags.length > 0;

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-2">
        <input
          value={pack.name}
          onChange={(e) => onRename(e.target.value)}
          placeholder="블록팩 이름"
          className="w-full rounded-[var(--radius-btn)] border border-border bg-background px-3 py-2 text-[15px] font-semibold tracking-tight outline-none focus:border-border-strong"
        />
        <textarea
          value={pack.description}
          onChange={(e) => onDescription(e.target.value)}
          placeholder="블록팩 설명 (선택)"
          rows={2}
          className="w-full resize-none rounded-[var(--radius-btn)] border border-border bg-background px-3 py-2 text-[13px] leading-relaxed outline-none placeholder:text-muted focus:border-border-strong"
        />
      </div>

      <div className="mt-4 flex-1">
        {!hasItems ? (
          <EmptyState
            title="아직 추가한 항목이 없어요."
            description="프롬프트 블록을 먼저 고르고, 필요하면 조각 태그를 붙여보세요."
          />
        ) : (
          <div className="space-y-4">
            {blocks.length > 0 && (
              <PackList title="프롬프트 블록">
                {blocks.map((b) => (
                  <li
                    key={b.id}
                    className="group/item flex items-center gap-2 rounded-[var(--radius-btn)] border border-border bg-background px-2.5 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">{b.name}</p>
                      <p className="truncate text-[12px] text-muted">{b.description}</p>
                    </div>
                    <IconBtn label="삭제" onClick={() => onRemove(b.id)}>
                      ×
                    </IconBtn>
                  </li>
                ))}
              </PackList>
            )}

            {tags.length > 0 && (
              <PackList title="조각 태그">
                {tags.map((tag) => (
                  <li
                    key={tag.id}
                    className="group/item flex items-center gap-2 rounded-[var(--radius-btn)] border border-border bg-subtle/50 px-2.5 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">
                        {tag.tag} <span className="font-normal text-muted">· {tag.labelKo}</span>
                      </p>
                      <p className="truncate text-[12px] text-muted">{tag.meaning}</p>
                    </div>
                    <IconBtn label="삭제" onClick={() => onRemoveTag(tag.id)}>
                      ×
                    </IconBtn>
                  </li>
                ))}
              </PackList>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <p className="mb-3 text-center text-[12px] font-medium text-muted">
          프롬프트 블록 {blocks.length}개 · 조각 태그 {tags.length}개
        </p>
        <Button variant="primary" size="sm" className="w-full" onClick={onSave} disabled={isSaving}>
          {isSaving ? "저장 중..." : "블록팩 저장"}
        </Button>
        <CopyRegisterButton pack={pack} full label="사용하기" variant="outline" className="mt-2" />
      </div>
    </div>
  );
}

function PackList({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-medium text-muted">{title}</p>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] text-[13px] text-muted transition-colors hover:bg-subtle hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
