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

export type RecommendedBlockPack = {
  id: string;
  name: string;
  description: string;
  category: string;
  blockIds: number[];
};

export type BlockPack = {
  id: string;
  name: string;
  description: string;
  blockIds: number[];
  createdAt: string;
  updatedAt: string;
};
