"use client";

import { Button } from "@/components/common/Button";
import { useToast } from "@/components/common/Toast";
import { generateRegisterPrompt } from "@/lib/generateRegisterPrompt";
import type { BlockPack } from "@/types";
import { cn } from "@/lib/utils";

export function CopyRegisterButton({
  pack,
  className,
  full,
  label = "사용하기",
  variant = "primary",
}: {
  pack: Pick<BlockPack, "name" | "description" | "blockIds" | "tagIds">;
  className?: string;
  full?: boolean;
  label?: string;
  variant?: "primary" | "outline" | "ghost";
}) {
  const { show } = useToast();
  const disabled = pack.blockIds.length + (pack.tagIds?.length ?? 0) === 0;

  async function copy() {
    const text = generateRegisterPrompt(pack);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      show("블록팩 등록 문구를 복사했어요. 내가 사용하는 AI에 붙여넣으세요.");
    } catch {
      show("복사에 실패했어요. 다시 시도해주세요.");
    }
  }

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={copy}
      disabled={disabled}
      className={cn(full && "w-full", className)}
    >
      {label}
    </Button>
  );
}
