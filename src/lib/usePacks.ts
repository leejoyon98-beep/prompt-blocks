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
  tagIds?: string[];
  created_at: string;
  updated_at: string;
};

const rowToPack = (r: Row): BlockPack => ({
  id: r.id,
  name: r.name,
  description: r.description,
  blockIds: r.block_ids ?? [],
  tagIds: r.tag_ids ?? r.tagIds ?? [],
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

const packToLegacyRow = (p: BlockPack, userId: string) => ({
  id: p.id,
  user_id: userId,
  name: p.name,
  description: p.description,
  block_ids: p.blockIds,
  created_at: p.createdAt,
  updated_at: p.updatedAt,
});

function isMissingTagIdsColumn(error: { message?: string; details?: string; hint?: string } | null) {
  const text = [error?.message, error?.details, error?.hint].filter(Boolean).join(" ");
  return text.includes("tag_ids");
}

async function upsertPack(supabase: SupabaseClient, pack: BlockPack, userId: string): Promise<boolean> {
  const { error } = await supabase.from(TABLE).upsert(packToRow(pack, userId));
  if (!error) return true;
  if (isMissingTagIdsColumn(error)) {
    const retry = await supabase.from(TABLE).upsert(packToLegacyRow(pack, userId));
    if (!retry.error) {
      console.warn("[packs] tag_ids column is missing; saved without 조각 태그 sync.");
      return true;
    }
    console.error("[packs] save failed", retry.error.message);
    return false;
  }
  console.error("[packs] save failed", error.message);
  return false;
}

async function insertPack(supabase: SupabaseClient, pack: BlockPack, userId: string): Promise<BlockPack> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(packToRow(pack, userId))
    .select("*")
    .single();

  if (!error && data) return rowToPack(data as Row);

  if (isMissingTagIdsColumn(error)) {
    const retry = await supabase
      .from(TABLE)
      .insert(packToLegacyRow(pack, userId))
      .select("*")
      .single();
    if (!retry.error && retry.data) return rowToPack(retry.data as Row);
    console.error("[packs] create failed", retry.error?.message);
    throw retry.error ?? error;
  }

  console.error("[packs] create failed", error?.message);
  throw error;
}

/** Upload local packs to the cloud once, only when the cloud is still empty. */
async function migrateLocalToCloud(supabase: SupabaseClient, userId: string) {
  const local = loadPacks();
  if (local.length === 0) return;
  const { count, error } = await supabase
    .from(TABLE)
    .select("id", { count: "exact", head: true });
  if (error || (count ?? 0) > 0) return;
  const { error: upsertError } = await supabase.from(TABLE).upsert(local.map((p) => packToRow(p, userId)));
  if (upsertError && isMissingTagIdsColumn(upsertError)) {
    await supabase.from(TABLE).upsert(local.map((p) => packToLegacyRow(p, userId)));
  }
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const reload = useCallback(async (uid: string | null) => {
    const supabase = getSupabase();
    setReady(false);
    setIsLoading(true);
    setError(null);

    try {
      if (uid && supabase) {
        const { data, error: loadError } = await supabase
          .from(TABLE)
          .select("*")
          .order("updated_at", { ascending: false });

        if (loadError) {
          console.error("[packs] load failed", loadError);
          setError(loadError);
          setPacks([]);
          return;
        }

        setPacks((data as Row[] | null)?.map(rowToPack) ?? []);
      } else {
        setPacks(loadPacks());
      }
    } catch (loadError) {
      console.error("[packs] load failed", loadError);
      setError(loadError);
      setPacks([]);
    } finally {
      setReady(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabase();

    if (!supabase) {
      const syncLocal = () => {
        try {
          setError(null);
          setPacks(loadPacks());
        } catch (loadError) {
          console.error("[packs] load failed", loadError);
          setError(loadError);
          setPacks([]);
        } finally {
          setReady(true);
          setIsLoading(false);
        }
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

    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError) {
        console.error("[packs] user lookup failed", authError);
      }
      handle(data.user?.id ?? null);
    }).catch((authError) => {
      console.error("[packs] user lookup failed", authError);
      handle(null);
    });
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
    async (next: BlockPack[], changed?: BlockPack, removedId?: string): Promise<boolean> => {
      const supabase = getSupabase();
      if (userId && supabase) {
        if (changed) {
          return upsertPack(supabase, changed, userId);
        }
        if (removedId) {
          const { error } = await supabase.from(TABLE).delete().eq("id", removedId);
          if (error) {
            console.error("[packs] delete failed", error.message);
            return false;
          }
          return true;
        }
      } else {
        savePacks(next);
        window.dispatchEvent(new Event("prompt-packs-changed"));
        return true;
      }
      return true;
    },
    [userId]
  );

  const createPack = useCallback(
    async (input?: { name?: string; description?: string; blockIds?: number[]; tagIds?: string[] }): Promise<BlockPack> => {
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

      const supabase = getSupabase();
      let created = pack;
      let savedInCloud = false;
      if (supabase) {
        let uid = userId;
        if (!uid) {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            console.error("[packs] user lookup failed", error.message);
            throw error;
          }
          uid = data.user?.id ?? null;
        }
        if (uid) {
          created = await insertPack(supabase, pack, uid);
          savedInCloud = true;
        }
      }

      const next = [created, ...packs];
      setPacks(next);
      if (!savedInCloud) {
        await persist(next, created);
      }
      return created;
    },
    [packs, persist, userId]
  );

  const updatePack = useCallback(
    async (id: string, patch: Partial<Omit<BlockPack, "id" | "createdAt">>): Promise<boolean> => {
      let updated: BlockPack | undefined;
      const next = packs.map((p) => {
        if (p.id !== id) return p;
        updated = { ...p, ...patch, updatedAt: now() };
        return updated;
      });
      if (!updated) return false;
      setPacks(next);
      return persist(next, updated);
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
    async (rec: RecommendedBlockPack): Promise<BlockPack> => {
      const ts = now();
      const pack: BlockPack = {
        id: newId(),
        name: uniqueName(rec.name, packs.map((p) => p.name)),
        description: rec.description,
        blockIds: [...rec.blockIds],
        tagIds: [...(rec.tagIds ?? [])],
        createdAt: ts,
        updatedAt: ts,
      };

      const supabase = getSupabase();
      let created = pack;
      let savedInCloud = false;
      if (supabase) {
        let uid = userId;
        if (!uid) {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            console.error("[packs] user lookup failed", error.message);
            throw error;
          }
          uid = data.user?.id ?? null;
        }
        if (uid) {
          created = await insertPack(supabase, pack, uid);
          savedInCloud = true;
        }
      }

      const next = [created, ...packs];
      setPacks(next);
      if (!savedInCloud) {
        await persist(next, created);
      }
      return created;
    },
    [packs, persist, userId]
  );

  return {
    packs,
    ready,
    isLoading,
    error,
    createPack,
    updatePack,
    deletePack,
    duplicatePack,
    startFromRecommended,
  };
}
