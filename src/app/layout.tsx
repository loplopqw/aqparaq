import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/lib/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "aqparaq — карьерный смарт-агрегатор",
  description: "Карьерный смарт-агрегатор для студентов и молодых специалистов: вакансии, стажировки, чемпионаты и хакатоны с Match Score и анализом Skill Gap.",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('aqparaq-theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex">
            <Sidebar />
            <main className="min-w-0 flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
