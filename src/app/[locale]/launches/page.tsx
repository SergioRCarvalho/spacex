"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { LaunchCard } from "@/components/launch-card";
import { SearchInput } from "@/components/search-input";
import client from "@/lib/apollo-client";
import { GET_LAUNCHES } from "@/lib/queries";
import { filterLaunches, type Launch } from "@/lib/search";

interface GetLaunchesData {
  launches: Launch[];
}

export default function LaunchesPage() {
  const _t = useTranslations("LaunchesPage");
  const [allLaunches, setAllLaunches] = useState<Launch[]>([]);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [displayedLaunches, setDisplayedLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const offsetRef = useRef(0);
  const limit = 20;

  const fetchLaunches = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      const { data } = await client.query({
        query: GET_LAUNCHES,
        variables: {
          limit: reset ? 1000 : limit,
          offset: reset ? 0 : offsetRef.current,
        },
      });

      const newLaunches = (data as GetLaunchesData)?.launches || [];
      if (reset) {
        setAllLaunches(newLaunches);
        setLaunches(newLaunches.slice(0, limit));
        setHasMore(newLaunches.length > limit);
        offsetRef.current = limit;
      } else {
        setLaunches((prev) => [...prev, ...newLaunches]);
        if (newLaunches.length < limit) {
          setHasMore(false);
        }
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
    if (!loading && hasMore && !search) {
      offsetRef.current += limit;
      fetchLaunches(false);
    }
  }, [loading, hasMore, fetchLaunches, search]);

  useEffect(() => {
    setDisplayedLaunches(
      filterLaunches(search ? allLaunches : launches, search),
    );
  }, [search, allLaunches, launches]);

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
        <div className="mb-8">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={_t("searchPlaceholder")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {displayedLaunches.map((launch) => (
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
