import { getLastNPlacements } from "../types/placements";
import placementQuery from "./startggQueries/recentPlacements"

const STARTGG_TOKEN = "0480ee99651ef1aa4ab59bdcf60633c6";

async function queryStartGG(query: string, variables: string) {
    let xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        xhr.open("POST", "https://api.start.gg/gql/alpha");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + STARTGG_TOKEN);

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState !== 4) {
              return;
            }
      
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              console.warn('request_error');
              reject();
            }
        };

        xhr.send(JSON.stringify({
            "query": query,
            "variables": variables
        }));
    });
}

export async function getRecentPlacements(playerID: number) {
	const query = placementQuery;
	const variables = JSON.stringify({ playerID });

	const response: any = await queryStartGG(query, variables);

  try {
	  return getLastNPlacements(response.data, 3);
  } catch (err: any) {
    console.log("failed to get placements for " + playerID);
    return [];
  }
}
