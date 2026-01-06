import { getTranslations } from "next-intl/server";
import { Header } from "@/components/header";
import { Link } from "@/i18n/navigation";

export default async function Home() {
  const t = await getTranslations("HomePage");

  // SpaceX GraphQL API doesn't provide total count directly
  // For demo purposes, using a static number
  const totalLaunches = 250;

  return (
    <div className="min-h-screen bg-white dark:bg-[#040606] flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        <section className=" px-5.5 md:px-15 lg:px-24 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16">
            <div className="flex-1 max-w-160">
              <h1 className="text-[42px] sm:text-[72px] lg:text-[68px] font-bold leading-[1.05] tracking-tight mb-6 text-[#121212] dark:text-white">
                {t("heroTitle")}
              </h1>
              <p className="text-[18px] sm:text-[18px] leading-relaxed text-[#323232] dark:text-[#a0a0a0] max-w-135 mb-8">
                {t("heroDescription")}
              </p>
              <Link
                href="/launches"
                className="inline-flex items-center justify-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                {t("viewLaunches")}
              </Link>
            </div>

            <div className="flex items-center gap-8 lg:gap-6 self-start lg:self-center mt-4 lg:mt-0">
              <div className="hidden lg:block w-px h-17 bg-[#007fff]" />
              <div className="flex items-center gap-6">
                <div className="text-[76px] sm:text-[80px] lg:text-[84px] font-semibold text-[#007fff]">
                  {totalLaunches}
                </div>
                <div className="text-[12px] uppercase tracking-widest text-[#121212] dark:text-[#a0a0a0] whitespace-nowrap leading-tight">
                  {t("totalLaunches")}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
