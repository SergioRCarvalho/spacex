import { useTranslations } from "next-intl";

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

  const getStatusText = () => {
    if (launch.launch_success === true) return t("success");
    if (launch.launch_success === false) return t("failure");
    return t("unknown");
  };

  return (
    <div className="bg-white dark:bg-[#121212] border border-[#e3e3e3] dark:border-[#323232] rounded-lg p-6 shadow-sm flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2 text-[#121212] dark:text-white">
          {launch.mission_name}
        </h3>
        <p className="text-sm text-[#555555] dark:text-[#7f7f7f] mb-2">
          {t("date")} {new Date(launch.launch_date_utc).toLocaleDateString()}
        </p>
        <p className="text-sm text-[#555555] dark:text-[#7f7f7f] mb-2">
          {t("rocket")} {launch.rocket.rocket_name}
        </p>
        <p className="text-sm text-[#555555] dark:text-[#7f7f7f] mb-4">
          {t("status")} {getStatusText()}
        </p>
      </div>
    </div>
  );
}
