import { blockById } from "@/data/promptBlocks";
import { tagById } from "@/data/promptTags";
import type { BlockPack, PromptBlock, PromptTag } from "@/types";

type RegisterPack = Pick<BlockPack, "name" | "blockIds" | "tagIds">;

function getBlocks(pack: Pick<BlockPack, "blockIds">): PromptBlock[] {
  return pack.blockIds
    .map((id) => blockById.get(id))
    .filter((block): block is PromptBlock => block != null);
}

function getTags(pack: Pick<BlockPack, "tagIds">): PromptTag[] {
  return (pack.tagIds ?? [])
    .map((id) => tagById.get(id))
    .filter((tag): tag is PromptTag => tag != null);
}

export function generateBlockNames(pack: Pick<BlockPack, "blockIds" | "tagIds">): string {
  const blockNames = getBlocks(pack).map((block) => block.name);
  const tagNames = getTags(pack).map((tag) => tag.tag);
  return [...blockNames, ...tagNames].join(" + ");
}

export function generateRegisterPrompt(pack: RegisterPack): string {
  const blocks = getBlocks(pack);
  const tags = getTags(pack);

  if (blocks.length === 0 && tags.length === 0) return "";

  const blockLines =
    blocks.length > 0
      ? blocks.map((block) => `- ${block.name}: ${block.description}`)
      : ["- 선택된 프롬프트 블록 없음"];
  const tagLines =
    tags.length > 0
      ? tags.map((tag) => `- ${tag.tag} (${tag.labelKo}): ${tag.meaning} → ${tag.promptText}`)
      : ["- 선택된 조각 태그 없음"];
  const example = generateBlockNames(pack);

  return [
    "앞으로 내가 아래 블록팩 이름이나 조합을 쓰면 다음 의미로 해석해줘.",
    "프롬프트 블록은 큰 작업 단위이고, 조각 태그는 답변 방식, 출력 형식, 톤, 검토 방식을 조정하는 modifier야.",
    "프롬프트 블록 여러 개와 조각 태그 여러 개를 +로 연결하면 각각의 의도를 조합해서 답해줘.",
    "",
    `[블록팩: ${pack.name}]`,
    "",
    "[프롬프트 블록]",
    ...blockLines,
    "",
    "[조각 태그 / modifier]",
    ...tagLines,
    "",
    "앞으로 내가 예를 들어",
    `${example}:`,
    "처럼 입력하면, 프롬프트 블록의 작업 목적에 조각 태그의 답변 방식을 붙여서 답해줘.",
  ].join("\n");
}
