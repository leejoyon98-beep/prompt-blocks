"use client";

import { useCallback, useEffect, useState } from "react";
import type { BlockPack, RecommendedBlockPack } from "@/types";
import { loadPacks, savePacks } from "./blockPacksStorage";
import { newId, uniqueName } from "./utils";

function now() {
  return new Date().toISOString();
}

/**
 * Single source of truth for my block packs.
 * Reads/writes localStorage and keeps multiple mounted components in sync
 * via a window event.
 */
export function usePacks() {
  const [packs, setPacks] = useState<BlockPack[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPacks(loadPacks());
    setReady(true);
    const onChange = () => setPacks(loadPacks());
    window.addEventListener("prompt-packs-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("prompt-packs-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const commit = useCallback((next: BlockPack[]) => {
    savePacks(next);
    setPacks(next);
    window.dispatchEvent(new Event("prompt-packs-changed"));
  }, []);

  const createPack = useCallback(
    (input?: { name?: string; description?: string; blockIds?: number[] }): BlockPack => {
      const current = loadPacks();
      const name = uniqueName(input?.name?.trim() || "새 블록팩", current.map((p) => p.name));
      const ts = now();
      const pack: BlockPack = {
        id: newId(),
        name,
        description: input?.description?.trim() || "",
        blockIds: input?.blockIds ? [...input.blockIds] : [],
        createdAt: ts,
        updatedAt: ts,
      };
      commit([pack, ...current]);
      return pack;
    },
    [commit]
  );

  const updatePack = useCallback(
    (id: string, patch: Partial<Omit<BlockPack, "id" | "createdAt">>) => {
      const current = loadPacks();
      commit(
        current.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: now() } : p))
      );
    },
    [commit]
  );

  const deletePack = useCallback(
    (id: string) => {
      commit(loadPacks().filter((p) => p.id !== id));
    },
    [commit]
  );

  const duplicatePack = useCallback(
    (id: string): BlockPack | undefined => {
      const current = loadPacks();
      const src = current.find((p) => p.id === id);
      if (!src) return undefined;
      const ts = now();
      const copy: BlockPack = {
        ...src,
        id: newId(),
        name: uniqueName(src.name, current.map((p) => p.name)),
        blockIds: [...src.blockIds],
        createdAt: ts,
        updatedAt: ts,
      };
      commit([copy, ...current]);
      return copy;
    },
    [commit]
  );

  const startFromRecommended = useCallback(
    (rec: RecommendedBlockPack): BlockPack => {
      const current = loadPacks();
      const ts = now();
      const pack: BlockPack = {
        id: newId(),
        name: uniqueName(rec.name, current.map((p) => p.name)),
        description: rec.description,
        blockIds: [...rec.blockIds],
        createdAt: ts,
        updatedAt: ts,
      };
      commit([pack, ...current]);
      return pack;
    },
    [commit]
  );

  return {
    packs,
    ready,
    createPack,
    updatePack,
    deletePack,
    duplicatePack,
    startFromRecommended,
  };
}
