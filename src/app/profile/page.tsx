import { Topbar } from "@/components/layout/Topbar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { CvUploadCard } from "@/components/profile/CvUploadCard";
import { AcademicCard } from "@/components/profile/AcademicCard";
import { B2BWidget } from "@/components/profile/B2BWidget";
import { CoursesCatalog } from "@/components/profile/CoursesCatalog";
import { AchievementsBlock } from "@/components/profile/AchievementsBlock";
import { getUser, getPartners, getCourseCatalog } from "@/lib/data";

export default function ProfilePage() {
  const user = getUser();
  const partners = getPartners();
  const courses = getCourseCatalog();

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar title="Личный кабинет" subtitle="Профиль, образование и карьерные инструменты" />

      <div className="space-y-5 px-6 py-5">
        <ProfileHeader user={user} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <AcademicCard user={user} />
            <CoursesCatalog courses={courses} />
          </div>
          <div className="space-y-5">
            <CvUploadCard user={user} />
            <B2BWidget partners={partners} />
            <AchievementsBlock achievements={user.achievements} />
          </div>
        </div>
      </div>
    </div>
  );
}
