export type PromptBlock = {
  id: number;
  name: string;
  category: string;
  description: string;
  /** English keywords used for search only, not displayed. */
  searchTags: string[];
  /** Names of recommended packs that include this block (max 3). */
  usedInPacks: string[];
};

export type PromptTag = {
  id: string;
  type: "modifier";
  category: string;
  tag: string;
  labelKo: string;
  meaning: string;
  promptText: string;
  aliases?: string[];
  similarTags?: {
    tag: string;
    difference: string;
  }[];
};

export type RecommendedBlockPack = {
  id: string;
  name: string;
  description: string;
  category: string;
  blockIds: number[];
  tagIds?: string[];
};

export type BlockPack = {
  id: string;
  name: string;
  description: string;
  blockIds: number[];
  tagIds: string[];
  createdAt: string;
  updatedAt: string;
};
