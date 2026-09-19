export type ListingType = "job" | "internship" | "championship" | "hackathon";

export interface Money {
  min?: number;
  max?: number;
  amount?: number;
  currency: string;
  period?: string;
}

export interface SkillGapItem {
  skill: string;
  reason: string;
  recommendedCourseId: string;
}

export interface Source {
  name: string;
  url: string;
}

export interface Listing {
  id: string;
  type: ListingType;
  title: string;
  company: string;
  companyLogoInitials: string;
  location: string;
  remote: boolean;
  employmentType?: string;
  experienceLevel?: string;
  format?: string;
  duration?: string;
  teamSize?: string;
  theme?: string;
  salary?: Money;
  prizePool?: Money;
  stack: string[];
  requirements: string[];
  niceToHave: string[];
  description: string;
  matchScore: number;
  skillGap: SkillGapItem[];
  source: Source;
  postedAt: string;
  deadline: string;
  isB2BPartner: boolean;
  tags: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface TranscriptEntry {
  id: string;
  course: string;
  grade: string;
  credits: number;
  term: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  goal?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarInitials: string;
  email: string;
  university: string;
  faculty: string;
  specialty: string;
  course: number;
  graduationYear: number;
  gpa: number;
  gpaScale: number;
  location: string;
  links: { linkedin: string; github: string; portfolio: string };
  cv: { fileName: string; uploadedAt: string; sizeKb: number };
  skills: Skill[];
  targetRoles: string[];
  transcript: TranscriptEntry[];
  achievements: Achievement[];
}

export interface Partner {
  id: string;
  name: string;
  logoInitials: string;
  dealDescription: string;
  activeOffers: number;
}

export interface CatalogCourse {
  id: string;
  title: string;
  university: string;
  level: string;
  duration: string;
  skillsCovered: string[];
  price: string;
  rating: number;
  url: string;
}

export type SortOption = "match" | "deadline" | "recent" | "salary";

export interface FilterState {
  query: string;
  remoteOnly: boolean;
  partnerOnly: boolean;
  minMatch: number;
  location: string;
  sort: SortOption;
}

export interface Database {
  user: UserProfile;
  partners: Partner[];
  courseCatalog: CatalogCourse[];
  listings: Listing[];
}
