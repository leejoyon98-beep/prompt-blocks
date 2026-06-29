import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-btn)] font-medium whitespace-nowrap transition-colors disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink/90",
  outline: "border border-border bg-background text-foreground hover:border-border-strong hover:bg-subtle",
  ghost: "text-muted hover:text-foreground hover:bg-subtle",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-9 px-4 text-[13px]",
};

export function Button({ variant = "outline", size = "md", className, ...props }: Props) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
