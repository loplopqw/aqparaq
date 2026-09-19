import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Listing } from "@/lib/types";
import { LISTING_TYPE_LABELS } from "@/lib/data";
import { MatchScoreRing } from "@/components/dashboard/MatchScoreRing";

export function TopPicksCard({ listings }: { listings: Listing[] }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <h3 className="mb-3 text-sm font-semibold text-text-primary">
        Топ предложений для отклика прямо сейчас
      </h3>
      <div className="space-y-2">
        {listings.map((l) => (
          <Link
            key={l.id}
            href={`/jobs/${l.id}`}
            className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface-2 px-3 py-2.5 transition-colors hover:border-accent/40"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text-primary">{l.title}</p>
              <p className="truncate text-xs text-text-muted">
                {l.company} · {LISTING_TYPE_LABELS[l.type]}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <MatchScoreRing score={l.matchScore} size={40} showLabel={false} />
              <ArrowUpRight size={14} className="text-text-muted" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
