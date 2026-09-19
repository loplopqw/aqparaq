import db from "@/data/db.json";
import type {
  AnswerFeedback,
  CatalogCourse,
  Database,
  InterviewQuestion,
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

export const INTERVIEW_SCORE_LABELS: Record<ReturnType<typeof matchScoreStatus>, string> = {
  good: "Отличный ответ",
  warning: "Хороший ответ",
  serious: "Есть куда расти",
  critical: "Нужно потренироваться",
};

export const INTERVIEW_CATEGORY_LABELS: Record<InterviewQuestion["category"], string> = {
  intro: "Вступление",
  technical: "Технический вопрос",
  behavioral: "Поведенческий вопрос",
  skillGap: "Skill Gap",
};

export function getInterviewQuestions(listing: Listing): InterviewQuestion[] {
  const questions: InterviewQuestion[] = [
    {
      id: "intro",
      category: "intro",
      prompt: `Расскажите о себе и почему вас заинтересовала позиция «${listing.title}» в ${listing.company}?`,
      keywords: [],
    },
  ];

  listing.stack.slice(0, 2).forEach((skill, i) => {
    questions.push({
      id: `tech-${i}`,
      category: "technical",
      prompt: `Расскажите о своём опыте работы с ${skill}. Приведите конкретный пример задачи, которую вы решали.`,
      keywords: [skill],
    });
  });

  if (listing.requirements[0]) {
    questions.push({
      id: "requirement",
      category: "technical",
      prompt: `В требованиях к вакансии указано: «${listing.requirements[0]}». Расскажите, как ваш опыт соответствует этому требованию.`,
      keywords: [listing.requirements[0]],
    });
  }

  questions.push({
    id: "behavioral",
    category: "behavioral",
    prompt: "Опишите ситуацию, когда вам пришлось решать сложную задачу в сжатые сроки. Как вы справились?",
    keywords: [],
  });

  if (listing.skillGap[0]) {
    questions.push({
      id: "gap",
      category: "skillGap",
      prompt: `По анализу вашего профиля у вас пока нет опыта с ${listing.skillGap[0].skill}. Как бы вы подошли к быстрому изучению этого навыка перед выходом на позицию?`,
      keywords: [listing.skillGap[0].skill],
    });
  }

  return questions;
}

export function evaluateAnswer(question: InterviewQuestion, answer: string): AnswerFeedback {
  const trimmed = answer.trim();
  if (!trimmed) {
    return { score: 0, comment: "Ответ пустой — попробуйте сформулировать хотя бы пару предложений." };
  }

  const wordCount = trimmed.split(/\s+/).length;
  const lower = trimmed.toLowerCase();
  const matchedKeywords = question.keywords.filter((k) => lower.includes(k.toLowerCase()));

  let score = 40;
  if (wordCount >= 15) score += 20;
  if (wordCount >= 40) score += 10;
  score += question.keywords.length > 0 ? Math.round((matchedKeywords.length / question.keywords.length) * 30) : 15;
  score = Math.min(100, score);

  const comments: string[] = [];
  if (wordCount < 15) {
    comments.push("Ответ короткий — постарайтесь раскрыть его подробнее, на конкретном примере.");
  }
  if (question.keywords.length > 0 && matchedKeywords.length === 0) {
    comments.push(`Упомяните конкретно «${question.keywords.join(", ")}», чтобы показать релевантный опыт.`);
  }
  if (comments.length === 0) {
    comments.push("Хороший структурированный ответ с релевантными деталями.");
  }

  return { score, comment: comments.join(" ") };
}

export function getAlumni() {
  return database.alumni;
}

export function getMentors() {
  return database.alumni.filter((a) => a.openToMentorship);
}

export function getExpertiseTags(alumni = database.alumni) {
  return Array.from(new Set(alumni.flatMap((a) => a.expertise))).sort();
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

  const topListing = [...database.listings].sort((a, b) => b.matchScore - a.matchScore)[0];
  stages.push({
    id: "interview",
    title: "Подготовиться к собеседованию",
    timeframe: "Перед откликом",
    description: "Пройти тренировочное MOCK-интервью с ИИ и получить обратную связь по ответам.",
    kind: "interview",
    interviewListingId: topListing?.id,
  });

  return stages;
}
