import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");

  // SpaceX GraphQL API doesn't provide total count directly
  // For demo purposes, using a static number
  const totalLaunches = 250;

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900">
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-black dark:text-white mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl mb-8">
              {t("heroDescription")}
            </p>
            <a
              href="/launches"
              className="inline-flex items-center justify-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              {t("viewLaunches")}
            </a>
          </div>

          <div className="flex items-center gap-8 lg:gap-6">
            <div className="w-px h-32 bg-zinc-300 dark:bg-zinc-700 hidden lg:block" />
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-blue-600">
                {totalLaunches}
              </div>
              <div className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                {t("totalLaunches")}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
