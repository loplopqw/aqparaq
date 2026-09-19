import { Sparkles, Lock } from "lucide-react";
import clsx from "clsx";

export function ComingSoonButton({
  label,
  icon: Icon = Sparkles,
  className,
}: {
  label: string;
  icon?: typeof Sparkles;
  className?: string;
}) {
  return (
    <button
      disabled
      title="Функция появится в следующей версии"
      className={clsx(
        "group relative flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-md border border-dashed border-line bg-surface-2 px-4 py-2.5 text-sm font-medium text-text-muted",
        className
      )}
    >
      <Icon size={16} />
      <span>{label}</span>
      <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
        <Lock size={10} />
        Скоро
      </span>
    </button>
  );
}

export function ComingSoonPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line bg-surface-2 px-6 py-10 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text-muted">
        <Lock size={18} />
      </div>
      <p className="text-sm font-semibold text-text-primary">{title}</p>
      <p className="max-w-xs text-xs text-text-muted">{description}</p>
      <span className="mt-1 inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
        Скоро в aqparaq
      </span>
    </div>
  );
}
