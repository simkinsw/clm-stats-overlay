/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Player } from "../types/player";

export async function getRankingList() {
    return await axios.get("https://storage.googleapis.com/chicago_2022-3/rankingList.json").then((response: any) => response.data);
}

export async function getH2h(p1: Player, p2: Player) {
    try {
        const p1SummerData = await axios.get(`https://storage.googleapis.com/chicago_2022-2/${p1.name}-h2hs.json`)as any;
        const p1FallData = await axios.get(`https://storage.googleapis.com/chicago_2022-3/${p1.name}-h2hs.json`) as any;

        const summerSets = p1SummerData?.data?.filter((item: any) => item.opponent === p2.name)[0]?.sets ?? [];
        const fallSets = p1FallData?.data?.filter((item: any) => item.opponent === p2.name)[0]?.sets ?? [];

        const allSets = [...summerSets, ...fallSets];

        const wins = allSets.filter((set) => set.setInfo.won).length;

        return {
            p1Wins: wins,
            p2Wins: allSets.length - wins,
            latestSet: allSets[allSets.length - 1]
        }
    } catch (error) {
        console.log("Could not get h2h for players: " + p1.name + " and " + p2.name);
        return {
            p1Wins: 0,
            p2Wins: 0,
            latestSet: {} as unknown
        };
    }
}