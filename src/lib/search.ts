export interface Launch {
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

export function filterLaunches(launches: Launch[], search: string): Launch[] {
  if (!search) return launches;
  const lowerSearch = search.toLowerCase();
  return launches.filter(
    (launch) =>
      launch.mission_name.toLowerCase().includes(lowerSearch) ||
      launch.rocket.rocket_name.toLowerCase().includes(lowerSearch),
  );
}
