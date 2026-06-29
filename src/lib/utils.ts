export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

/** Returns "이름", "이름 2", "이름 3"… so the name is unique among existing names. */
export function uniqueName(base: string, existing: string[]): string {
  const set = new Set(existing);
  if (!set.has(base)) return base;
  let n = 2;
  while (set.has(`${base} ${n}`)) n += 1;
  return `${base} ${n}`;
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `pack_${crypto.randomUUID().slice(0, 8)}`;
  }
  return `pack_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
