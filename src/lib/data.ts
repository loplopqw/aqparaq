import db from "@/data/db.json";
import type { CatalogCourse, Database, Listing, ListingType } from "@/lib/types";

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
