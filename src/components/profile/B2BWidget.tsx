import Link from "next/link";
import { Handshake, ArrowUpRight } from "lucide-react";
import type { Partner } from "@/lib/types";

export function B2BWidget({ partners }: { partners: Partner[] }) {
  const totalOffers = partners.reduce((sum, p) => sum + p.activeOffers, 0);

  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Handshake size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-text-primary">Эксклюзивные вакансии от партнёров вуза</h3>
        </div>
        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
          {totalOffers} офферов
        </span>
      </div>

      <div className="space-y-2">
        {partners.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface-2 px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface text-[11px] font-bold text-text-secondary">
                {p.logoInitials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">{p.name}</p>
                <p className="truncate text-xs text-text-muted">{p.dealDescription}</p>
              </div>
            </div>
            <span className="shrink-0 text-xs font-semibold text-status-good">{p.activeOffers}</span>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-md border border-line py-2 text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary"
      >
        Смотреть все вакансии партнёров
        <ArrowUpRight size={12} />
      </Link>
    </div>
  );
}
