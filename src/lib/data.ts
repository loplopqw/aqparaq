import db from "@/data/db.json";
import type {
  CatalogCourse,
  Database,
  Listing,
  ListingType,
  RoadmapStage,
  RoleReadiness,
  SkillGapSummaryItem,
} from "@/lib/types";

const database = db as unknown as Database;

export function getUser() {
  return database.user;
}

export function getPartners() {
  return database.partners;
}

export function getCourseCatalog() {
  return database.courseCatalog;
}

export function getListings() {
  return database.listings;
}

export function getListingsByType(type: ListingType) {
  return database.listings.filter((l) => l.type === type);
}

export function getListingById(id: string) {
  return database.listings.find((l) => l.id === id);
}

export function getCourseById(id: string): CatalogCourse | undefined {
  return database.courseCatalog.find((c) => c.id === id);
}

export function formatMoney(value?: number, currency = "KZT") {
  if (value === undefined) return "";
  const formatted = new Intl.NumberFormat("ru-RU").format(value);
  const symbol = currency === "KZT" ? "₸" : currency;
  return `${formatted} ${symbol}`;
}

export function formatSalaryRange(listing: Listing) {
  const money = listing.salary ?? listing.prizePool;
  if (!money) return "Не указано";
  if (money.min !== undefined && money.max !== undefined) {
    return `${formatMoney(money.min, money.currency)} – ${formatMoney(money.max, money.currency)}${money.period ? ` / ${money.period}` : ""}`;
  }
  if (money.amount !== undefined) {
    return `Призовой фонд: ${formatMoney(money.amount, money.currency)}`;
  }
  return "Не указано";
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(iso)
  );
}

export function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  job: "Вакансии",
  internship: "Стажировки",
  championship: "Чемпионаты",
  hackathon: "Хакатоны",
};

export function matchScoreStatus(score: number): "good" | "warning" | "serious" | "critical" {
  if (score >= 75) return "good";
  if (score >= 50) return "warning";
  if (score >= 30) return "serious";
  return "critical";
}

export const MATCH_SCORE_LABELS: Record<ReturnType<typeof matchScoreStatus>, string> = {
  good: "Высокое совпадение",
  warning: "Среднее совпадение",
  serious: "Слабое совпадение",
  critical: "Низкое совпадение",
};

export function getSkillGapSummary(limit = 5): SkillGapSummaryItem[] {
  const counts = new Map<string, { count: number; courseId: string }>();
  for (const listing of database.listings) {
    for (const gap of listing.skillGap) {
      const existing = counts.get(gap.skill);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(gap.skill, { count: 1, courseId: gap.recommendedCourseId });
      }
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, limit)
    .map(([skill, v]) => ({ skill, count: v.count, course: getCourseById(v.courseId) }));
}

export function getRoleReadiness(): RoleReadiness[] {
  return database.user.targetRoles.map((role) => {
    const keywords = role.toLowerCase().split(" ");
    const matchedListings = database.listings.filter((l) => {
      const title = l.title.toLowerCase();
      return keywords.every((kw) => title.includes(kw));
    });
    const pool = matchedListings.length > 0 ? matchedListings : database.listings;
    const avgMatch = Math.round(pool.reduce((sum, l) => sum + l.matchScore, 0) / pool.length);
    return { role, avgMatch, matchedListings };
  });
}

export function getCareerRoadmap(): RoadmapStage[] {
  const gaps = getSkillGapSummary(3);
  const timeframes = ["Ближайшие 2–4 недели", "Через 1–2 месяца", "Через 2–3 месяца"];

  const stages: RoadmapStage[] = gaps.map((gap, i) => ({
    id: `skill-${gap.skill}`,
    title: `Закрыть пробел: ${gap.skill}`,
    timeframe: timeframes[i] ?? `Этап ${i + 1}`,
    description: `Этот навык отмечен как недостающий в ${gap.count} предложени${
      gap.count === 1 ? "и" : "ях"
    } из вашей ленты.`,
    course: gap.course,
    kind: "skill",
  }));

  stages.push({
    id: "apply",
    title: "Откликнуться на топ-подборку",
    timeframe: "После закрытия ключевых пробелов",
    description: "Подать заявки на предложения с самым высоким Match Score из вашей ленты.",
    kind: "apply",
  });

  stages.push({
    id: "interview",
    title: "Подготовиться к собеседованию",
    timeframe: "Перед откликом",
    description: "Пройти тренировочное интервью и получить обратную связь по ответам.",
    kind: "interview",
  });

  return stages;
}
