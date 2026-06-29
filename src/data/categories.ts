export const CATEGORY_ORDER = [
  "전체",
  "범용 작업",
  "자료 검색",
  "딥리서치",
  "기획/보고",
  "분석/검토",
  "상품기획",
  "마케팅/브랜드",
  "콘텐츠 제작",
  "사진/영상/비주얼",
] as const;

export const UI_CATEGORIES = CATEGORY_ORDER.filter((category) => category !== "전체");

export type Category = (typeof UI_CATEGORIES)[number];

const CATEGORY_ALIASES: Record<string, Category> = {
  콘텐츠제작: "콘텐츠 제작",
  기획보고: "기획/보고",
  분석검토: "분석/검토",
  마케팅브랜드: "마케팅/브랜드",
  사진영상비주얼: "사진/영상/비주얼",
  메일: "범용 작업",
};

export function normalizeCategory(category: string): Category {
  const compact = category.replace(/\s+/g, "");
  if ((UI_CATEGORIES as readonly string[]).includes(category)) return category as Category;
  return CATEGORY_ALIASES[category] ?? CATEGORY_ALIASES[compact] ?? "범용 작업";
}
