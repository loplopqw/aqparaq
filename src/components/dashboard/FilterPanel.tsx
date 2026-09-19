"use client";

import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import type { FilterState, SortOption } from "@/lib/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "match", label: "По Match Score" },
  { value: "deadline", label: "По дедлайну" },
  { value: "recent", label: "По дате публикации" },
  { value: "salary", label: "По зарплате / призу" },
];

const DEFAULT_FILTERS: FilterState = {
  query: "",
  remoteOnly: false,
  partnerOnly: false,
  minMatch: 0,
  location: "all",
  sort: "match",
};

export { DEFAULT_FILTERS };

export function FilterPanel({
  filters,
  onChange,
  locations,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  locations: string[];
}) {
  function set<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <aside className="w-full shrink-0 space-y-5 border-line lg:w-64 lg:border-r lg:pr-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <SlidersHorizontal size={14} />
          Фильтры
        </div>
        <button
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="flex items-center gap-1 text-xs text-text-muted hover:text-accent"
        >
          <RotateCcw size={11} /> Сбросить
        </button>
      </div>

      <div className="relative">
        <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          value={filters.query}
          onChange={(e) => set("query", e.target.value)}
          placeholder="Поиск по названию, компании..."
          className="w-full rounded-md border border-line bg-surface-2 py-2 pl-8 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-secondary">Сортировка</label>
        <select
          value={filters.sort}
          onChange={(e) => set("sort", e.target.value as SortOption)}
          className="w-full rounded-md border border-line bg-surface-2 px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-secondary">Город</label>
        <select
          value={filters.location}
          onChange={(e) => set("location", e.target.value)}
          className="w-full rounded-md border border-line bg-surface-2 px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
        >
          <option value="all">Все города</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-text-secondary">
          <span>Минимальный Match Score</span>
          <span className="font-semibold text-accent">{filters.minMatch}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={filters.minMatch}
          onChange={(e) => set("minMatch", Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={filters.remoteOnly}
            onChange={(e) => set("remoteOnly", e.target.checked)}
            className="h-4 w-4 rounded border-line accent-[var(--accent)]"
          />
          Только удалённые
        </label>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={filters.partnerOnly}
            onChange={(e) => set("partnerOnly", e.target.checked)}
            className="h-4 w-4 rounded border-line accent-[var(--accent)]"
          />
          Только партнёры вуза
        </label>
      </div>
    </aside>
  );
}
