"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { LaunchCard } from "@/components/launch-card";
import client from "@/lib/apollo-client";
import { GET_LAUNCHES } from "@/lib/queries";

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

interface GetLaunchesData {
  launches: Launch[];
}

export default function LaunchesPage() {
  const t = useTranslations("LaunchesPage");
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(0);
  const limit = 20;

  const fetchLaunches = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      const { data } = await client.query({
        query: GET_LAUNCHES,
        variables: { limit, offset: offsetRef.current },
      });

      const newLaunches = (data as GetLaunchesData)?.launches || [];
      if (reset) {
        setLaunches(newLaunches);
      } else {
        setLaunches((prev) => [...prev, ...newLaunches]);
      }

      if (newLaunches.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching launches:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLaunches(true);
  }, [fetchLaunches]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      offsetRef.current += limit;
      fetchLaunches(false);
    }
  }, [loading, hasMore, fetchLaunches]);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, hasMore, loadMore]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#040606] flex flex-col">
      <Header />

      <main className="flex-1 px-5.5 md:px-15 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {launches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </div>

        <div ref={sentinelRef} className="h-4" />

        {loading && (
          <div className="flex justify-center mt-8">
            <Loader2 className="animate-spin h-8 w-8 text-[#555555] dark:text-[#7f7f7f]" />
          </div>
        )}
      </main>
    </div>
  );
}
