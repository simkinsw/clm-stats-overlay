import { Player } from "./player";

export type h2hProps = {
    players: Player[];
}

export type playerSummaryProps = {
    player: Player;
    side: string;
}

export type winLossProps = {
    wins: number;
    side: string;
}

export type placementsProps = {
    player: Player;
    side: string;
}

export type appProps = {
    ranks: any;
}
