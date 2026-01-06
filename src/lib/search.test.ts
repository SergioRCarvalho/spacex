import { describe, expect, it } from "vitest";
import { filterLaunches, type Launch } from "./search";

const mockLaunches: Launch[] = [
  {
    id: "1",
    mission_name: "Falcon 9 Test Flight",
    launch_date_utc: "2023-01-01T00:00:00.000Z",
    launch_success: true,
    details: "Test mission",
    rocket: { rocket_name: "Falcon 9" },
    links: {
      mission_patch: null,
      article_link: null,
      wikipedia: null,
      video_link: null,
    },
  },
  {
    id: "2",
    mission_name: "Starship Launch",
    launch_date_utc: "2023-02-01T00:00:00.000Z",
    launch_success: false,
    details: "Starship test",
    rocket: { rocket_name: "Starship" },
    links: {
      mission_patch: null,
      article_link: null,
      wikipedia: null,
      video_link: null,
    },
  },
];

describe("filterLaunches", () => {
  it("returns all launches when search is empty", () => {
    const result = filterLaunches(mockLaunches, "");
    expect(result).toEqual(mockLaunches);
  });

  it("filters launches by mission name", () => {
    const result = filterLaunches(mockLaunches, "Falcon");
    expect(result).toHaveLength(1);
    expect(result[0].mission_name).toBe("Falcon 9 Test Flight");
  });

  it("filters launches by rocket name", () => {
    const result = filterLaunches(mockLaunches, "Starship");
    expect(result).toHaveLength(1);
    expect(result[0].rocket.rocket_name).toBe("Starship");
  });

  it("is case insensitive", () => {
    const result = filterLaunches(mockLaunches, "falcon");
    expect(result).toHaveLength(1);
    expect(result[0].mission_name).toBe("Falcon 9 Test Flight");
  });

  it("returns empty array when no matches", () => {
    const result = filterLaunches(mockLaunches, "nonexistent");
    expect(result).toHaveLength(0);
  });
});
