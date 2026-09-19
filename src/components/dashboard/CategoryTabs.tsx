"use client";

import clsx from "clsx";
import type { ListingType } from "@/lib/types";
import { LISTING_TYPE_LABELS } from "@/lib/data";

const TYPES: ListingType[] = ["job", "internship", "championship", "hackathon"];

export function CategoryTabs({
  active,
  onChange,
  counts,
}: {
  active: ListingType;
  onChange: (type: ListingType) => void;
  counts: Record<ListingType, number>;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-line px-6">
      {TYPES.map((type) => {
        const isActive = active === type;
        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={clsx(
              "relative flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors",
              isActive
                ? "border-accent text-text-primary"
                : "border-transparent text-text-muted hover:text-text-primary"
            )}
          >
            {LISTING_TYPE_LABELS[type]}
            <span
              className={clsx(
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                isActive ? "bg-accent-soft text-accent" : "bg-surface-2 text-text-muted"
              )}
            >
              {counts[type]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
