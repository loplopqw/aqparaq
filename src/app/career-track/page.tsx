import { Sparkles } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { RoleReadinessCard } from "@/components/career-track/RoleReadinessCard";
import { PriorityGapsCard } from "@/components/career-track/PriorityGapsCard";
import { RoadmapTimeline } from "@/components/career-track/RoadmapTimeline";
import { TopPicksCard } from "@/components/career-track/TopPicksCard";
import { getRoleReadiness, getSkillGapSummary, getCareerRoadmap, getListings } from "@/lib/data";

export default function CareerTrackPage() {
  const roles = getRoleReadiness();
  const gaps = getSkillGapSummary(5);
  const roadmap = getCareerRoadmap();
  const topPicks = [...getListings()].sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

  const overallReadiness = roles.length
    ? Math.round(roles.reduce((sum, r) => sum + r.avgMatch, 0) / roles.length)
    : 0;
  const topGap = gaps[0];

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar
        title="AI-Карьерный трек"
        subtitle="Персональный план развития на основе вашего профиля и рынка предложений"
      />

      <div className="space-y-5 px-6 py-5">
        <div className="flex flex-col gap-3 rounded-lg border border-accent/30 bg-accent-soft p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Общая готовность к целевым ролям: {overallReadiness}%
              </p>
              {topGap && (
                <p className="mt-0.5 text-xs text-text-secondary">
                  Быстрее всего повысить её поможет закрытие навыка «{topGap.skill}» — он
                  встречается в {topGap.count} {topGap.count === 1 ? "предложении" : "предложениях"}{" "}
                  из вашей ленты.
                </p>
              )}
            </div>
          </div>
        </div>

        <RoleReadinessCard roles={roles} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <PriorityGapsCard gaps={gaps} />
          <TopPicksCard listings={topPicks} />
        </div>

        <RoadmapTimeline stages={roadmap} />
      </div>
    </div>
  );
}
