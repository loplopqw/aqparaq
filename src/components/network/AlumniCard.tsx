"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Check } from "lucide-react";
import clsx from "clsx";
import type { AlumniProfile } from "@/lib/types";

export function AlumniCard({
  alumnus,
  mode,
}: {
  alumnus: AlumniProfile;
  mode: "referral" | "mentorship";
}) {
  const [sent, setSent] = useState(false);
  const eligible = mode === "referral" ? alumnus.openToReferral : alumnus.openToMentorship;
  const ctaLabel = mode === "referral" ? "Запросить реферал" : "Запросить менторство";
  const disabledLabel = mode === "referral" ? "Сейчас не принимает запросы" : "Сейчас не берёт менти";

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
          {alumnus.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-primary">{alumnus.name}</p>
          <p className="truncate text-xs text-text-secondary">
            {alumnus.currentRole} · {alumnus.currentCompany}
          </p>
          <p className="truncate text-[11px] text-text-muted">
            Выпуск {alumnus.graduationYear} · {alumnus.specialty}
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-text-secondary">{alumnus.bio}</p>

      <div className="flex flex-wrap gap-1.5">
        {alumnus.expertise.map((e) => (
          <span key={e} className="rounded bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-secondary">
            {e}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-1">
        <button
          onClick={() => setSent(true)}
          disabled={!eligible || sent}
          className={clsx(
            "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors",
            !eligible
              ? "cursor-not-allowed bg-surface-2 text-text-muted"
              : sent
                ? "bg-status-good-soft text-status-good"
                : "bg-accent text-white hover:bg-accent-hover"
          )}
        >
          {sent && <Check size={13} />}
          {!eligible ? disabledLabel : sent ? "Запрос отправлен" : ctaLabel}
        </button>
        <Link
          href={alumnus.linkedin}
          target="_blank"
          rel="noreferrer"
          title="Открыть LinkedIn"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
        >
          <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
}
