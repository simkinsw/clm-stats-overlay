import { winLossProps } from "../types/propsTypes";

function WinLoss({ wins, side }: winLossProps) {
    return (
        <div className={"player-box " + side}>
            <span className="wins">{wins}</span>
        </div>
    )
}

export default WinLoss;