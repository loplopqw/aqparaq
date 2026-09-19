import { matchScoreStatus, MATCH_SCORE_LABELS } from "@/lib/data";

const STATUS_VAR: Record<ReturnType<typeof matchScoreStatus>, string> = {
  good: "var(--status-good)",
  warning: "var(--status-warning)",
  serious: "var(--status-serious)",
  critical: "var(--status-critical)",
};

export function MatchScoreRing({
  score,
  size = 56,
  showLabel = true,
  label = "Match Score",
  statusLabels = MATCH_SCORE_LABELS,
}: {
  score: number;
  size?: number;
  showLabel?: boolean;
  label?: string;
  statusLabels?: Record<ReturnType<typeof matchScoreStatus>, string>;
}) {
  const status = matchScoreStatus(score);
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const color = STATUS_VAR[status];

  return (
    <div className="flex flex-col items-center gap-1" title={`${statusLabels[status]}: ${score}%`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--surface-2)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.4s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold leading-none text-text-primary">{score}%</span>
        </div>
      </div>
      {showLabel && (
        <span className="text-center text-[10px] font-medium leading-tight text-text-muted">
          {label}
        </span>
      )}
    </div>
  );
}
