"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { AlumniCard } from "@/components/network/AlumniCard";
import { StatTile } from "@/components/ui/StatTile";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAlumni } from "@/lib/data";

const alumni = getAlumni();
const companyCount = new Set(alumni.map((a) => a.currentCompany)).size;
const referralCount = alumni.filter((a) => a.openToReferral).length;

export default function AlumniNetworkPage() {
  const [query, setQuery] = useState("");
  const [referralOnly, setReferralOnly] = useState(false);

  const filtered = useMemo(() => {
    return alumni.filter((a) => {
      if (referralOnly && !a.openToReferral) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (!a.name.toLowerCase().includes(q) && !a.currentCompany.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [query, referralOnly]);

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar
        title="Alumni Network"
        subtitle="Выпускники вашего вуза — связь для рефералов и карьерных советов"
      />

      <div className="space-y-5 px-4 py-5 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatTile label="Выпускников в сети" value={String(alumni.length)} />
          <StatTile label="Открыты к рефералу" value={String(referralCount)} />
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
          <label className="flex items-center gap-2 whitespace-nowrap text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={referralOnly}
              onChange={(e) => setReferralOnly(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-[var(--accent)]"
            />
            Только открыты к рефералу
          </label>
        </div>

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((a) => (
              <AlumniCard key={a.id} alumnus={a} mode="referral" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
