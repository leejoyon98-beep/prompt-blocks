import type { BlockPack } from "@/types";

const KEY = "prompt-block-packs";

function isValidPack(x: unknown): x is BlockPack {
  if (!x || typeof x !== "object") return false;
  const p = x as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.name === "string" &&
    typeof p.description === "string" &&
    Array.isArray(p.blockIds) &&
    p.blockIds.every((n) => typeof n === "number") &&
    typeof p.createdAt === "string" &&
    typeof p.updatedAt === "string"
  );
}

function normalizePack(pack: BlockPack): BlockPack {
  return {
    ...pack,
    tagIds: Array.isArray(pack.tagIds) ? pack.tagIds.filter((id) => typeof id === "string") : [],
  };
}

export function loadPacks(): BlockPack[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidPack).map(normalizePack);
  } catch {
    return [];
  }
}

export function savePacks(packs: BlockPack[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(packs));
  } catch {
    // storage full or unavailable — fail silently
  }
}
