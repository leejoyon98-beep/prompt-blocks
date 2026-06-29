import { blockById } from "@/data/promptBlocks";
import type { BlockPack } from "@/types";

/**
 * Build the "블록팩 등록" text that the user pastes into their AI.
 * Missing block ids are skipped. Returns "" when no valid blocks remain.
 */
export function generateRegisterPrompt(pack: Pick<BlockPack, "name" | "blockIds">): string {
  const blocks = pack.blockIds
    .map((id) => blockById.get(id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  if (blocks.length === 0) return "";

  const lines = blocks.map((b) => `- ${b.name}: ${b.description}`);
  const example = blocks.slice(0, 3).map((b) => b.name).join(" + ");

  return [
    "앞으로 내가 아래 프롬프트 블록을 쓰면 다음 의미로 해석해줘.",
    "프롬프트 블록 여러 개를 +로 연결하면 각각의 의도를 조합해서 답변해줘.",
    "",
    `[블록팩: ${pack.name}]`,
    "",
    ...lines,
    "",
    "앞으로 내가 예를 들어",
    `${example}:`,
    "처럼 입력하면, 위 블록팩의 의미를 조합해서 답변해줘.",
  ].join("\n");
}
