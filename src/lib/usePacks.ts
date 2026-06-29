"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { BlockPack, RecommendedBlockPack } from "@/types";
import { loadPacks, savePacks } from "./blockPacksStorage";
import { newId, uniqueName } from "./utils";
import { getSupabase } from "./supabase";

const TABLE = "block_packs";

function now() {
  return new Date().toISOString();
}

type Row = {
  id: string;
  name: string;
  description: string;
  block_ids: number[];
  tag_ids?: string[];
  created_at: string;
  updated_at: string;
};

const rowToPack = (r: Row): BlockPack => ({
  id: r.id,
  name: r.name,
  description: r.description,
  blockIds: r.block_ids ?? [],
  tagIds: r.tag_ids ?? [],
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const packToRow = (p: BlockPack, userId: string) => ({
  id: p.id,
  user_id: userId,
  name: p.name,
  description: p.description,
  block_ids: p.blockIds,
  tag_ids: p.tagIds ?? [],
  created_at: p.createdAt,
  updated_at: p.updatedAt,
});

/** Upload local packs to the cloud once, only when the cloud is still empty. */
async function migrateLocalToCloud(supabase: SupabaseClient, userId: string) {
  const local = loadPacks();
  if (local.length === 0) return;
  const { count, error } = await supabase
    .from(TABLE)
    .select("id", { count: "exact", head: true });
  if (error || (count ?? 0) > 0) return;
  await supabase.from(TABLE).upsert(local.map((p) => packToRow(p, userId)));
}

/**
 * Single source of truth for my block packs.
 * - Logged out (or no Supabase env): localStorage.
 * - Logged in: Supabase cloud, synced across devices.
 * UI state is optimistic; writes are mirrored to the active backend.
 */
export function usePacks() {
  const [packs, setPacks] = useState<BlockPack[]>([]);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const reload = useCallback(async (uid: string | null) => {
    const supabase = getSupabase();
    if (uid && supabase) {
      const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .order("updated_at", { ascending: false });
      if (!error && data) setPacks((data as Row[]).map(rowToPack));
    } else {
      setPacks(loadPacks());
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const supabase = getSupabase();

    if (!supabase) {
      const syncLocal = () => {
        setPacks(loadPacks());
        setReady(true);
      };
      queueMicrotask(syncLocal);
      window.addEventListener("prompt-packs-changed", syncLocal);
      window.addEventListener("storage", syncLocal);
      return () => {
        window.removeEventListener("prompt-packs-changed", syncLocal);
        window.removeEventListener("storage", syncLocal);
      };
    }

    let active = true;
    const handle = async (uid: string | null) => {
      if (!active) return;
      setUserId(uid);
      if (uid) await migrateLocalToCloud(supabase, uid);
      await reload(uid);
    };

    supabase.auth.getUser().then(({ data }) => handle(data.user?.id ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) =>
      handle(session?.user?.id ?? null)
    );
    const onLocalChange = () => {
      if (!userId) setPacks(loadPacks());
    };
    window.addEventListener("prompt-packs-changed", onLocalChange);
    return () => {
      active = false;
      sub.subscription.unsubscribe();
      window.removeEventListener("prompt-packs-changed", onLocalChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const persist = useCallback(
    async (next: BlockPack[], changed?: BlockPack, removedId?: string) => {
      const supabase = getSupabase();
      if (userId && supabase) {
        if (changed) {
          const { error } = await supabase.from(TABLE).upsert(packToRow(changed, userId));
          if (error) console.error("[packs] save failed", error.message);
        }
        if (removedId) {
          const { error } = await supabase.from(TABLE).delete().eq("id", removedId);
          if (error) console.error("[packs] delete failed", error.message);
        }
      } else {
        savePacks(next);
        window.dispatchEvent(new Event("prompt-packs-changed"));
      }
    },
    [userId]
  );

  const createPack = useCallback(
    (input?: { name?: string; description?: string; blockIds?: number[]; tagIds?: string[] }): BlockPack => {
      const name = uniqueName(input?.name?.trim() || "새 블록팩", packs.map((p) => p.name));
      const ts = now();
      const pack: BlockPack = {
        id: newId(),
        name,
        description: input?.description?.trim() || "",
        blockIds: input?.blockIds ? [...input.blockIds] : [],
        tagIds: input?.tagIds ? [...input.tagIds] : [],
        createdAt: ts,
        updatedAt: ts,
      };
      const next = [pack, ...packs];
      setPacks(next);
      persist(next, pack);
      return pack;
    },
    [packs, persist]
  );

  const updatePack = useCallback(
    (id: string, patch: Partial<Omit<BlockPack, "id" | "createdAt">>) => {
      let updated: BlockPack | undefined;
      const next = packs.map((p) => {
        if (p.id !== id) return p;
        updated = { ...p, ...patch, updatedAt: now() };
        return updated;
      });
      setPacks(next);
      if (updated) persist(next, updated);
    },
    [packs, persist]
  );

  const deletePack = useCallback(
    (id: string) => {
      const next = packs.filter((p) => p.id !== id);
      setPacks(next);
      persist(next, undefined, id);
    },
    [packs, persist]
  );

  const duplicatePack = useCallback(
    (id: string): BlockPack | undefined => {
      const src = packs.find((p) => p.id === id);
      if (!src) return undefined;
      const ts = now();
      const copy: BlockPack = {
        ...src,
        id: newId(),
        name: uniqueName(src.name, packs.map((p) => p.name)),
        blockIds: [...src.blockIds],
        tagIds: [...(src.tagIds ?? [])],
        createdAt: ts,
        updatedAt: ts,
      };
      const next = [copy, ...packs];
      setPacks(next);
      persist(next, copy);
      return copy;
    },
    [packs, persist]
  );

  const startFromRecommended = useCallback(
    (rec: RecommendedBlockPack): BlockPack => {
      const ts = now();
      const pack: BlockPack = {
        id: newId(),
        name: uniqueName(rec.name, packs.map((p) => p.name)),
        description: rec.description,
        blockIds: [...rec.blockIds],
        tagIds: [],
        createdAt: ts,
        updatedAt: ts,
      };
      const next = [pack, ...packs];
      setPacks(next);
      persist(next, pack);
      return pack;
    },
    [packs, persist]
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
