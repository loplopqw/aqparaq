"use client";

import { useMemo, useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { CategoryTabs } from "@/components/dashboard/CategoryTabs";
import { FilterPanel, DEFAULT_FILTERS } from "@/components/dashboard/FilterPanel";
import { ListingCard } from "@/components/dashboard/ListingCard";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { getListings, daysUntil } from "@/lib/data";
import type { FilterState, ListingType } from "@/lib/types";

const allListings = getListings();
const locations = Array.from(new Set(allListings.map((l) => l.location))).sort();

export default function DashboardPage() {
  const [activeType, setActiveType] = useState<ListingType>("job");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const counts = useMemo(() => {
    const result: Record<ListingType, number> = { job: 0, internship: 0, championship: 0, hackathon: 0 };
    for (const l of allListings) result[l.type]++;
    return result;
  }, []);

  const filtered = useMemo(() => {
    let list = allListings.filter((l) => l.type === activeType);

    if (filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      list = list.filter((l) => l.title.toLowerCase().includes(q) || l.company.toLowerCase().includes(q));
    }
    if (filters.remoteOnly) list = list.filter((l) => l.remote);
    if (filters.partnerOnly) list = list.filter((l) => l.isB2BPartner);
    if (filters.location !== "all") list = list.filter((l) => l.location === filters.location);
    if (filters.minMatch > 0) list = list.filter((l) => l.matchScore >= filters.minMatch);

    const sorted = [...list].sort((a, b) => {
      switch (filters.sort) {
        case "match":
          return b.matchScore - a.matchScore;
        case "deadline":
          return daysUntil(a.deadline) - daysUntil(b.deadline);
        case "recent":
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        case "salary": {
          const av = a.salary?.max ?? a.prizePool?.amount ?? 0;
          const bv = b.salary?.max ?? b.prizePool?.amount ?? 0;
          return bv - av;
        }
        default:
          return 0;
      }
    });

    return sorted;
  }, [activeType, filters]);

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar title="Лента рекомендаций" subtitle="Персонализированная подборка на основе вашего профиля" />
      <CategoryTabs active={activeType} onChange={setActiveType} counts={counts} />
      <StatsRow listings={filtered} />

      <div className="flex flex-1 flex-col gap-6 px-6 pb-8 lg:flex-row">
        <FilterPanel filters={filters} onChange={setFilters} locations={locations} />

        <div className="min-w-0 flex-1">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
