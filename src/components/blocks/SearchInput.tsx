"use client";

export function SearchInput({
  value,
  onChange,
  placeholder = "블록 이름이나 키워드로 검색",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full min-w-0">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-[var(--radius-btn)] border border-border bg-background pl-9 pr-3 text-[13px] outline-none placeholder:text-muted focus:border-border-strong"
      />
    </div>
  );
}
