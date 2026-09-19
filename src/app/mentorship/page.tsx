"use client";

import { useMemo, useState } from "react";
import { Search, Info } from "lucide-react";
import clsx from "clsx";
import { Topbar } from "@/components/layout/Topbar";
import { AlumniCard } from "@/components/network/AlumniCard";
import { StatTile } from "@/components/ui/StatTile";
import { EmptyState } from "@/components/ui/EmptyState";
import { getMentors, getExpertiseTags } from "@/lib/data";

const mentors = getMentors();
const expertiseTags = getExpertiseTags(mentors);
const companyCount = new Set(mentors.map((m) => m.currentCompany)).size;

export default function MentorshipPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return mentors.filter((m) => {
      if (tag && !m.expertise.includes(tag)) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (!m.name.toLowerCase().includes(q) && !m.currentCompany.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [query, tag]);

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar title="Менторство" subtitle="Найдите наставника среди выпускников вашего вуза" />

      <div className="space-y-5 px-6 py-5">
        <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4">
          <Info size={16} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-xs leading-relaxed text-text-secondary">
            <span className="font-semibold text-text-primary">Как это работает:</span> выберите
            ментора и отправьте запрос — эксперт свяжется с вами в течение нескольких рабочих дней,
            чтобы договориться о формате и времени 1:1 звонка.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatTile label="Менторов доступно" value={String(mentors.length)} />
          <StatTile label="Направлений экспертизы" value={String(expertiseTags.length)} />
          <StatTile label="Компаний представлено" value={String(companyCount)} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={14}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по имени или компании..."
              className="w-full rounded-md border border-line bg-surface-2 py-2 pl-8 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setTag(null)}
            className={clsx(
              "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              tag === null ? "bg-accent text-white" : "bg-surface-2 text-text-secondary hover:bg-surface-hover"
            )}
          >
            Все направления
          </button>
          {expertiseTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t === tag ? null : t)}
              className={clsx(
                "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                tag === t ? "bg-accent text-white" : "bg-surface-2 text-text-secondary hover:bg-surface-hover"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((m) => (
              <AlumniCard key={m.id} alumnus={m} mode="mentorship" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
