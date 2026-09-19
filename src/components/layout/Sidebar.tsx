"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Users,
  GraduationCap,
  ChevronsLeft,
  ChevronsRight,
  Compass,
  X,
} from "lucide-react";
import { useState } from "react";
import { getUser } from "@/lib/data";
import { useMobileNav } from "@/lib/mobile-nav-provider";
import clsx from "clsx";

const user = getUser();

const navItems = [
  { href: "/", label: "Лента", icon: LayoutDashboard },
  { href: "/career-track", label: "AI-Карьерный трек", icon: Compass },
  { href: "/alumni", label: "Alumni Network", icon: Users },
  { href: "/mentorship", label: "Менторство", icon: GraduationCap },
  { href: "/profile", label: "Личный кабинет", icon: User },
];

function SidebarBody({
  collapsed,
  onNavigate,
  onCollapseToggle,
  showCollapseToggle,
  onClose,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  onCollapseToggle?: () => void;
  showCollapseToggle: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-14 items-center justify-between gap-2 border-b border-line px-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
            AQ
          </div>
          {!collapsed && (
            <span className="truncate text-[15px] font-semibold tracking-tight text-text-primary">
              aqparaq
            </span>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-muted hover:bg-surface-hover hover:text-text-primary lg:hidden"
            aria-label="Закрыть меню"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={clsx(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-soft text-accent"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} strokeWidth={2} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-line p-3">
        {!collapsed ? (
          <Link
            href="/profile"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-surface-hover"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
              {user.avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text-primary">{user.name}</p>
              <p className="truncate text-xs text-text-muted">GPA {user.gpa.toFixed(2)}</p>
            </div>
          </Link>
        ) : (
          <Link
            href="/profile"
            onClick={onNavigate}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent"
          >
            {user.avatarInitials}
          </Link>
        )}
        {showCollapseToggle && onCollapseToggle && (
          <button
            onClick={onCollapseToggle}
            className="mt-2 hidden w-full items-center justify-center gap-2 rounded-md py-1.5 text-xs text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary lg:flex"
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </button>
        )}
      </div>
    </>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { open, close } = useMobileNav();

  return (
    <>
      {/* Desktop rail */}
      <aside
        className={clsx(
          "sticky top-0 hidden h-screen flex-col border-r border-line bg-surface transition-[width] duration-200 lg:flex",
          collapsed ? "w-[72px]" : "w-[240px]"
        )}
      >
        <SidebarBody collapsed={collapsed} onCollapseToggle={() => setCollapsed((c) => !c)} showCollapseToggle />
      </aside>

      {/* Mobile off-canvas drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <aside className="absolute left-0 top-0 flex h-full w-[260px] flex-col bg-surface shadow-xl">
            <SidebarBody collapsed={false} onNavigate={close} onClose={close} showCollapseToggle={false} />
          </aside>
        </div>
      )}
    </>
  );
}
