import { blockById } from "@/data/promptBlocks";
import { tagById } from "@/data/promptTags";
import type { BlockPack, PromptBlock, PromptTag } from "@/types";

type RegisterPack = Pick<BlockPack, "name" | "description" | "blockIds" | "tagIds">;

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

function generateBlockNames(pack: Pick<BlockPack, "blockIds" | "tagIds">): string {
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
      ? blocks.map((block, index) => `${index + 1}. ${block.name}: ${block.description}`)
      : ["- 선택된 프롬프트 블록 없음"];
  const tagLines =
    tags.length > 0
      ? tags.map((tag) => `- ${tag.tag}: ${tag.meaning}`)
      : ["- 선택된 조각 태그 없음"];
  const packName = pack.name.trim() || "이 블록팩";
  const packDescription = pack.description.trim() || "설명 없음";
  const optionalCombination = generateBlockNames(pack);

  return [
    "앞으로 내가 아래 블록팩 이름을 말하면, 해당 블록팩에 포함된 프롬프트 블록과 조각 태그의 의도를 조합해서 답변해줘.",
    "",
    "[블록팩 이름]",
    packName,
    "",
    "[블록팩 설명]",
    packDescription,
    "",
    "[프롬프트 블록 순서]",
    ...blockLines,
    "",
    "[포함된 조각 태그]",
    ...tagLines,
    "",
    "[사용 방식]",
    `1. 내가 “${packName}으로 해줘”라고 말하면, 이 블록팩에 포함된 블록과 태그의 의도를 조합해서 답변해줘.`,
    `2. 내가 블록팩 이름 뒤에 콜론(:)을 붙이고 내용을 입력하면, 그 내용을 대상으로 작업해줘. 예: “${packName}:”`,
    "3. 프롬프트 블록은 위에 적힌 순서대로 작업 흐름을 우선 해석해줘.",
    "4. 조각 태그는 답변 방식과 출력 형식을 조정하는 옵션으로 함께 적용해줘.",
    "5. 필요하면 포함된 프롬프트 블록과 조각 태그를 기준으로 답변 형식, 관점, 톤, 출력 방식을 정해줘.",
    "6. 내가 개별 프롬프트 블록이나 조각 태그를 따로 말하면, 그것도 같은 의미로 해석해줘.",
    optionalCombination
      ? `7. 보조적으로 “${optionalCombination}”처럼 개별 블록과 태그를 +로 조합해 말할 수도 있어.`
      : "7. 보조적으로 개별 블록과 태그를 +로 조합해 말할 수도 있어.",
    "",
    "[사용 예시]",
    `${packName}으로 해줘:`,
    "{사용자가 넣을 내용}",
    "",
    "또는",
    "",
    `${packName}:`,
    "{사용자가 넣을 내용}",
  ].join("\n");
}
