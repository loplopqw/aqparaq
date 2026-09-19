import clsx from "clsx";

type Variant = "neutral" | "accent" | "good" | "warning" | "serious" | "critical";

const variantClasses: Record<Variant, string> = {
  neutral: "bg-surface-2 text-text-secondary",
  accent: "bg-accent-soft text-accent",
  good: "bg-status-good-soft text-status-good",
  warning: "bg-status-warning-soft text-status-warning",
  serious: "bg-status-serious-soft text-status-serious",
  critical: "bg-status-critical-soft text-status-critical",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
