"use client";

import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useMobileNav } from "@/lib/mobile-nav-provider";

export function Topbar({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const { toggle } = useMobileNav();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-line bg-surface/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={toggle}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-secondary hover:bg-surface-hover hover:text-text-primary lg:hidden"
          aria-label="Открыть меню"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-semibold text-text-primary">{title}</h1>
          {subtitle && <p className="truncate text-xs text-text-muted">{subtitle}</p>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {children}
        <ThemeToggle />
      </div>
    </header>
  );
}
