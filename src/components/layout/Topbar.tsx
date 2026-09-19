import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Topbar({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-line bg-surface/95 px-6 backdrop-blur">
      <div className="min-w-0">
        <h1 className="truncate text-[15px] font-semibold text-text-primary">{title}</h1>
        {subtitle && <p className="truncate text-xs text-text-muted">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {children}
        <ThemeToggle />
      </div>
    </header>
  );
}
