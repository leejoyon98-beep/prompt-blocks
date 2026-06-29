export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-border px-6 py-14 text-center">
      <p className="text-[15px] font-medium text-foreground">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-sm whitespace-pre-line text-[13px] leading-relaxed text-muted">
          {description}
        </p>
      )}
      {children && <div className="mt-5 flex flex-wrap items-center justify-center gap-2">{children}</div>}
    </div>
  );
}
