"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/header";
import { LaunchCard } from "@/components/launch-card";

interface Launch {
  id: string;
  mission_name: string;
  launch_date_utc: string;
  launch_success: boolean | null;
  details: string | null;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch: string | null;
    article_link: string | null;
    wikipedia: string | null;
    video_link: string | null;
  };
}

export default function FavoritesPage() {
  const t = useTranslations("FavoritesPage");
  const [launches, setLaunches] = useState<Launch[]>([]);

  const updateFavorites = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setLaunches(favorites);
  }, []);

  useEffect(() => {
    updateFavorites();

    const handleFavoritesChange = () => {
      updateFavorites();
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);

    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
    };
  }, [updateFavorites]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#040606] flex flex-col">
      <Header />

      <main className="flex-1 px-5.5 md:px-15 lg:px-24 py-12">
        <h1 className="text-3xl font-bold mb-8 text-[#121212] dark:text-white">
          {t("title")}
        </h1>

        {launches.length === 0 ? (
          <p className="text-center text-[#555555] dark:text-[#cccccc]">
            {t("noFavorites")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {launches.map((launch) => (
              <LaunchCard key={launch.id} launch={launch} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}