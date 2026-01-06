import { gql } from "@apollo/client";

export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_utc
      launch_success
      details
      rocket {
        rocket_name
      }
      links {
        mission_patch
        article_link
        wikipedia
        video_link
      }
    }
  }
`;
