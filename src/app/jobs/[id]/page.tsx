import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Wifi, Clock, CalendarDays, Handshake, Users } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { MatchScoreRing } from "@/components/dashboard/MatchScoreRing";
import { SkillGapBlock } from "@/components/dashboard/SkillGapBlock";
import { ComingSoonButton } from "@/components/ui/ComingSoon";
import { Badge } from "@/components/ui/Badge";
import {
  getListingById,
  getListings,
  getAlumni,
  formatDate,
  formatSalaryRange,
  LISTING_TYPE_LABELS,
} from "@/lib/data";

export function generateStaticParams() {
  return getListings().map((l) => ({ id: l.id }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const meta = [listing.location, listing.employmentType ?? listing.format ?? listing.duration].filter(Boolean);
  const alumniAtCompany = getAlumni().filter((a) => a.currentCompany === listing.company);

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar title={listing.title} subtitle={listing.company} />

      <div className="px-4 py-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent">
          <ArrowLeft size={14} /> Назад к ленте
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-4 pb-10 sm:px-6 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-5">
          <div className="rounded-lg border border-line bg-surface p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="accent">{LISTING_TYPE_LABELS[listing.type]}</Badge>
              {listing.isB2BPartner && (
                <Badge variant="good" className="gap-1">
                  <Handshake size={11} /> Партнёр вашего вуза
                </Badge>
              )}
              {listing.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <h2 className="text-xl font-bold text-text-primary">{listing.title}</h2>
            <p className="mt-1 text-sm text-text-secondary">{listing.company}</p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {meta[0]}
              </span>
              {listing.remote && (
                <span className="flex items-center gap-1.5">
                  <Wifi size={14} /> Удалённо
                </span>
              )}
              {meta[1] && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {meta[1]}
                </span>
              )}
              {listing.teamSize && (
                <span className="flex items-center gap-1.5">
                  <Users size={14} /> Команда: {listing.teamSize}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} /> Дедлайн: {formatDate(listing.deadline)}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-surface p-5">
            <h3 className="mb-2 text-sm font-semibold text-text-primary">Описание</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{listing.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface p-5">
              <h3 className="mb-2 text-sm font-semibold text-text-primary">Требования</h3>
              <ul className="space-y-1.5">
                {listing.requirements.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-line bg-surface p-5">
              <h3 className="mb-2 text-sm font-semibold text-text-primary">Будет плюсом</h3>
              <ul className="space-y-1.5">
                {listing.niceToHave.length === 0 && (
                  <li className="text-sm text-text-muted">Не указано</li>
                )}
                {listing.niceToHave.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-surface-hover" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">Стек / направление</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {listing.stack.map((s) => (
                <span key={s} className="rounded bg-surface-2 px-2.5 py-1 text-xs font-medium text-text-secondary">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-surface p-5">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Skill Gap — анализ пробелов</h3>
            <SkillGapBlock gaps={listing.skillGap} />
          </div>
        </div>

        <div className="w-full shrink-0 space-y-4 lg:w-80">
          <div className="flex flex-col items-center gap-3 rounded-lg border border-line bg-surface p-5">
            <MatchScoreRing score={listing.matchScore} size={88} />
            <p className="text-center text-sm font-semibold text-text-primary">{formatSalaryRange(listing)}</p>
            <Link
              href={listing.source.url}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Откликнуться на {listing.source.name}
              <ExternalLink size={14} />
            </Link>
            <p className="text-center text-[11px] text-text-muted">
              Отклик происходит на сайте первоисточника — {listing.source.name}
            </p>
          </div>

          <div className="space-y-2 rounded-lg border border-line bg-surface p-5">
            <Link
              href="/alumni"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            >
              <Users size={16} />
              Найти реферала в Alumni Network
            </Link>
            {alumniAtCompany.length > 0 && (
              <p className="text-center text-[11px] text-text-muted">
                {alumniAtCompany.length}{" "}
                {alumniAtCompany.length === 1 ? "выпускник работает" : "выпускника работают"} в{" "}
                {listing.company}
              </p>
            )}
          </div>

          <div className="space-y-2 rounded-lg border border-line bg-surface p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Запланированные фичи
            </h4>
            <ComingSoonButton label="Пройти MOCK-интервью с ИИ" />
          </div>

          <div className="rounded-lg border border-line bg-surface p-5 text-xs text-text-muted">
            <p>Опубликовано: {formatDate(listing.postedAt)}</p>
            <p className="mt-1">Дедлайн подачи: {formatDate(listing.deadline)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
