import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { RoleReadiness } from "@/lib/types";
import { MatchScoreRing } from "@/components/dashboard/MatchScoreRing";

export function RoleReadinessCard({ roles }: { roles: RoleReadiness[] }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <h3 className="mb-3 text-sm font-semibold text-text-primary">Готовность по целевым ролям</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roles.map((r) => (
          <div key={r.role} className="flex items-center gap-4 rounded-md border border-line bg-surface-2 p-3">
            <MatchScoreRing score={r.avgMatch} size={64} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">{r.role}</p>
              <p className="text-xs text-text-muted">
                {r.matchedListings.length > 0
                  ? `${r.matchedListings.length} подходящих предложений в ленте`
                  : "Пока нет точных совпадений — оценка по всей ленте"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
      >
        Смотреть предложения в ленте
        <ArrowUpRight size={12} />
      </Link>
    </div>
  );
}
