import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp, ExternalLink, Youtube } from "lucide-react";
import { Button } from "./ui/button";

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

interface LaunchCardProps {
  launch: Launch;
}

export function LaunchCard({ launch }: LaunchCardProps) {
  const t = useTranslations("LaunchesPage");
  const [expanded, setExpanded] = useState(false);

  const getStatusText = () => {
    if (launch.launch_success === true) return t("success");
    if (launch.launch_success === false) return t("failure");
    return t("unknown");
  };

  return (
    <div className="bg-white dark:bg-[#121212] border border-[#e3e3e3] dark:border-[#323232] rounded-lg p-6 shadow-sm flex flex-col relative pb-20">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2 text-[#121212] dark:text-white">
          {launch.mission_name}
        </h3>
        <p className="text-sm text-[#555555] dark:text-[#cccccc] mb-2">
          {t("date")} {new Date(launch.launch_date_utc).toLocaleDateString()}
        </p>
        <p className="text-sm text-[#555555] dark:text-[#cccccc] mb-2">
          {t("rocket")} {launch.rocket.rocket_name}
        </p>
        <p className="text-sm text-[#555555] dark:text-[#cccccc] mb-4">
          {t("status")} {getStatusText()}
        </p>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            expanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4">
            {launch.details && (
              <p className="text-sm mb-4 text-[#555555] dark:text-[#cccccc]">
                {launch.details}
              </p>
            )}
            <div className="flex gap-2">
              {launch.links.article_link && (
                <a
                  href={launch.links.article_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-[#121212] dark:text-white"
                >
                  Article
                </a>
              )}
              {launch.links.wikipedia && (
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-[#121212] dark:text-white"
                >
                  Wikipedia
                </a>
              )}
              {launch.links.video_link && (
                <a
                  href={launch.links.video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-[#121212] dark:text-white"
                >
                  Video
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute bottom-0 left-0 right-0 w-full flex justify-center items-center gap-2 py-4 cursor-pointer transition-colors border-t border-[#e3e3e3] dark:border-[#323232]"
        type="button"
      >
        <span className="text-sm text-[#555555] dark:text-[#cccccc]">
          {expanded ? "Less" : "More"}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 text-[#121212] dark:text-white ${expanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
