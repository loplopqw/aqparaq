import Link from "next/link";
import { ExternalLink, MapPin, Wifi, Clock, Handshake } from "lucide-react";
import type { Listing } from "@/lib/types";
import { formatDate, formatSalaryRange, daysUntil, LISTING_TYPE_LABELS } from "@/lib/data";
import { MatchScoreRing } from "@/components/dashboard/MatchScoreRing";
import { SkillGapBlock } from "@/components/dashboard/SkillGapBlock";
import { Badge } from "@/components/ui/Badge";

export function ListingCard({ listing }: { listing: Listing }) {
  const left = daysUntil(listing.deadline);
  const urgency = left <= 5 ? "critical" : left <= 14 ? "warning" : "neutral";
  const meta = [listing.location, listing.employmentType ?? listing.format ?? listing.duration].filter(Boolean);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-2 text-xs font-bold text-text-secondary">
            {listing.companyLogoInitials}
          </div>
          <div className="min-w-0">
            <div className="mb-0.5 flex flex-wrap items-center gap-2">
              <Badge variant="accent">{LISTING_TYPE_LABELS[listing.type]}</Badge>
              {listing.isB2BPartner && (
                <Badge variant="good" className="gap-1">
                  <Handshake size={11} /> Партнёр вуза
                </Badge>
              )}
            </div>
            <Link href={`/jobs/${listing.id}`} className="block truncate text-[15px] font-semibold text-text-primary hover:text-accent">
              {listing.title}
            </Link>
            <p className="truncate text-sm text-text-secondary">{listing.company}</p>
          </div>
        </div>
        <MatchScoreRing score={listing.matchScore} />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {meta[0]}
        </span>
        {listing.remote && (
          <span className="flex items-center gap-1">
            <Wifi size={12} /> Удалённо
          </span>
        )}
        {meta[1] && <span>{meta[1]}</span>}
        <span
          className={
            urgency === "critical"
              ? "flex items-center gap-1 font-medium text-status-critical"
              : urgency === "warning"
                ? "flex items-center gap-1 font-medium text-status-warning"
                : "flex items-center gap-1"
          }
        >
          <Clock size={12} /> Дедлайн {formatDate(listing.deadline)}
        </span>
      </div>

      <p className="text-sm font-medium text-text-primary">{formatSalaryRange(listing)}</p>

      <div className="flex flex-wrap gap-1.5">
        {listing.stack.slice(0, 5).map((s) => (
          <span key={s} className="rounded bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-secondary">
            {s}
          </span>
        ))}
        {listing.stack.length > 5 && (
          <span className="rounded bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-muted">
            +{listing.stack.length - 5}
          </span>
        )}
      </div>

      <SkillGapBlock gaps={listing.skillGap.slice(0, 1)} />
      {listing.skillGap.length > 1 && (
        <Link href={`/jobs/${listing.id}`} className="text-xs font-medium text-accent hover:underline">
          Ещё {listing.skillGap.length - 1} пробел(а) в навыках →
        </Link>
      )}

      <div className="mt-1 flex items-center justify-between border-t border-line pt-3">
        <span className="text-[11px] text-text-muted">Опубликовано {formatDate(listing.postedAt)}</span>
        <div className="flex items-center gap-2">
          <Link
            href={`/jobs/${listing.id}`}
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Подробнее
          </Link>
          <Link
            href={listing.source.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            title={`Открыть первоисточник на ${listing.source.name}`}
          >
            <ExternalLink size={12} />
            {listing.source.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
