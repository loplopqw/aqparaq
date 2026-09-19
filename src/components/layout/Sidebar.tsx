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
} from "lucide-react";
import { useState } from "react";
import { getUser } from "@/lib/data";
import clsx from "clsx";

const user = getUser();

const navItems = [
  { href: "/", label: "Лента", icon: LayoutDashboard },
  { href: "/career-track", label: "AI-Карьерный трек", icon: Compass },
  { href: "/alumni", label: "Alumni Network", icon: Users },
  { href: "/mentorship", label: "Менторство", icon: GraduationCap },
  { href: "/profile", label: "Личный кабинет", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "sticky top-0 flex h-screen flex-col border-r border-line bg-surface transition-[width] duration-200",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-line px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
          AQ
        </div>
        {!collapsed && (
          <span className="truncate text-[15px] font-semibold tracking-tight text-text-primary">
            aqparaq
          </span>
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
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent"
          >
            {user.avatarInitials}
          </Link>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-md py-1.5 text-xs text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
