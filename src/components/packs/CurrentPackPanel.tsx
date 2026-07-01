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
  onMove,
  onRemove,
  onMoveTag,
  onRemoveTag,
  onSave,
}: {
  pack: BlockPack;
  blocks: PromptBlock[];
  tags: PromptTag[];
  onRename: (v: string) => void;
  onDescription: (v: string) => void;
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: (id: number) => void;
  onMoveTag: (index: number, dir: -1 | 1) => void;
  onRemoveTag: (id: string) => void;
  onSave: () => Promise<void> | void;
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

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[12px] font-medium text-muted">
          프롬프트 블록 {blocks.length}개 · 조각 태그 {tags.length}개
        </span>
      </div>

      <div className="mt-2 flex-1">
        {!hasItems ? (
          <EmptyState
            title="아직 추가한 항목이 없어요."
            description="프롬프트 블록을 먼저 고르고, 필요하면 조각 태그를 붙여보세요."
          />
        ) : (
          <div className="space-y-4">
            {blocks.length > 0 && (
              <PackList title="프롬프트 블록">
                {blocks.map((b, i) => (
                  <li
                    key={b.id}
                    className="group/item flex items-center gap-2 rounded-[var(--radius-btn)] border border-border bg-background px-2.5 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">{b.name}</p>
                      <p className="truncate text-[12px] text-muted">{b.description}</p>
                    </div>
                    <ItemControls
                      index={i}
                      length={blocks.length}
                      onMove={onMove}
                      onRemove={() => onRemove(b.id)}
                    />
                  </li>
                ))}
              </PackList>
            )}

            {tags.length > 0 && (
              <PackList title="조각 태그">
                {tags.map((tag, i) => (
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
                    <ItemControls
                      index={i}
                      length={tags.length}
                      onMove={onMoveTag}
                      onRemove={() => onRemoveTag(tag.id)}
                    />
                  </li>
                ))}
              </PackList>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <Button variant="primary" size="sm" className="w-full" onClick={onSave}>
          블록팩 저장
        </Button>
        <CopyRegisterButton pack={pack} full label="사용하기" variant="outline" className="mt-2" />
        <p className="mt-2 text-center text-[12px] leading-relaxed text-muted">
          블록팩 이름으로 불러 쓸 수 있도록 등록 문구를 복사해요.
          <br />
          복사한 내용을 내가 사용하는 AI에 붙여넣으면, 이후에는 블록팩 이름만 말해도 해당 조합으로 요청할 수 있어요.
        </p>
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

function ItemControls({
  index,
  length,
  onMove,
  onRemove,
}: {
  index: number;
  length: number;
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <IconBtn
        label="위로"
        disabled={index === 0}
        className="opacity-0 group-hover/item:opacity-100 focus-visible:opacity-100"
        onClick={() => onMove(index, -1)}
      >
        ↑
      </IconBtn>
      <IconBtn
        label="아래로"
        disabled={index === length - 1}
        className="opacity-0 group-hover/item:opacity-100 focus-visible:opacity-100"
        onClick={() => onMove(index, 1)}
      >
        ↓
      </IconBtn>
      <IconBtn label="삭제" onClick={onRemove}>
        ×
      </IconBtn>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  label,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        "flex h-7 w-7 items-center justify-center rounded-[8px] text-[13px] text-muted transition-colors hover:bg-subtle hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
