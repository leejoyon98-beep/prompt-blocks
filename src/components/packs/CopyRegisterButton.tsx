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
}: {
  pack: Pick<BlockPack, "name" | "blockIds">;
  className?: string;
  full?: boolean;
}) {
  const { show } = useToast();
  const disabled = pack.blockIds.length === 0;

  async function copy() {
    const text = generateRegisterPrompt(pack);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      show("복사했어요. 내가 쓰는 AI에 붙여넣으세요.");
    } catch {
      show("복사에 실패했어요. 다시 시도해주세요.");
    }
  }

  return (
    <Button
      variant="primary"
      size="sm"
      onClick={copy}
      disabled={disabled}
      className={cn(full && "w-full", className)}
    >
      블록팩 등록
    </Button>
  );
}
