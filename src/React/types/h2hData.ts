export type h2hData = {
    p1Wins: number;
    p2Wins: number;
    latestSet: Set;
}

export type Set = {
    setInfo: {
        "won": boolean;
        "dq": boolean;
        "round": string;
        "wonGames": string;
        "lostGames": string;
        "opponentName": string;
        "winnerName": string;
        "loserName": string;
    };
    tournamentName: string;
    date: string;
    slug: string;
}