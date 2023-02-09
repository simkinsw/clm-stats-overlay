import { playerSummaryProps } from "../types/propsTypes";

function PlayerSummary({ player, side }: playerSummaryProps) {

    const rankString = player.rank !== -1 ? `#${player.rank}` : "unranked";

    return (
        <div className={"player-box " + side}>
            <span className="playerName">{player.name.toUpperCase()}</span>
            <span className="playerRank">
                {side === "left" ? (
                        <div>
                            <span>Summer 2022</span>
                            <span> - </span>
                            <span className="rankString">{rankString}</span>
                        </div>
                    ) : (
                        <div>
                            <span className="rankString">{rankString}</span>
                            <span> - </span>
                            <span>Summer 2022</span>
                        </div>
                    )   }
            </span>
        </div>
    )
}

export default PlayerSummary;

