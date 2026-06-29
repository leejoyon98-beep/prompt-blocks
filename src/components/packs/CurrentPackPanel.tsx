"use client";

import type { BlockPack, PromptBlock } from "@/types";
import { Button } from "@/components/common/Button";
import { CopyRegisterButton } from "./CopyRegisterButton";
import { EmptyState } from "@/components/common/EmptyState";
import { useToast } from "@/components/common/Toast";
import { generateBlockNames } from "@/lib/generateRegisterPrompt";

export function CurrentPackPanel({
  pack,
  blocks,
  onRename,
  onDescription,
  onMove,
  onRemove,
  onDuplicate,
  onDelete,
}: {
  pack: BlockPack;
  blocks: PromptBlock[];
  onRename: (v: string) => void;
  onDescription: (v: string) => void;
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: (id: number) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const { show } = useToast();

  async function copyNames() {
    const text = generateBlockNames(pack);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      show("블록명을 복사했어요.");
    } catch {
      show("복사에 실패했어요. 다시 시도해주세요.");
    }
  }

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
        <span className="text-[12px] font-medium text-muted">포함 블록 {blocks.length}개</span>
      </div>

      <div className="mt-2 flex-1">
        {blocks.length === 0 ? (
          <EmptyState
            title="아직 추가된 블록이 없어요."
            description="왼쪽 라이브러리에서 필요한 프롬프트 블록을 추가해보세요."
          />
        ) : (
          <ul className="space-y-1.5">
            {blocks.map((b, i) => (
              <li
                key={b.id}
                className="flex items-center gap-2 rounded-[var(--radius-btn)] border border-border bg-background px-2.5 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{b.name}</p>
                  <p className="truncate text-[12px] text-muted">{b.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <IconBtn label="위로" disabled={i === 0} onClick={() => onMove(i, -1)}>
                    ↑
                  </IconBtn>
                  <IconBtn label="아래로" disabled={i === blocks.length - 1} onClick={() => onMove(i, 1)}>
                    ↓
                  </IconBtn>
                  <IconBtn label="삭제" onClick={() => onRemove(b.id)}>
                    ✕
                  </IconBtn>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <CopyRegisterButton pack={pack} full />
        <button
          onClick={copyNames}
          disabled={blocks.length === 0}
          className="mt-2 w-full rounded-[var(--radius-btn)] border border-border bg-background py-1.5 text-[12px] font-medium text-foreground transition-colors hover:border-border-strong hover:bg-subtle disabled:opacity-40 disabled:pointer-events-none"
        >
          블록명만 복사
        </button>
        <p className="mt-2 text-center text-[12px] leading-relaxed text-muted">
          복사한 내용을 내가 사용하는 AI에 붙여넣으세요.
        </p>
        <div className="mt-3 flex items-center justify-center gap-1">
          <Button variant="ghost" size="sm" onClick={onDuplicate}>
            복제
          </Button>
          <span className="text-border-strong">·</span>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            삭제
          </Button>
        </div>
      </div>
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
      className="flex h-7 w-7 items-center justify-center rounded-[8px] text-[13px] text-muted transition-colors hover:bg-subtle hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
