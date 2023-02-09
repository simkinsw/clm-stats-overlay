import { h2hProps } from "../types/propsTypes";
import PlayerSummary from "./PlayerSummary";
import TitleBox from "./TitleBox";
import React, { useState } from "react";
import { h2hData } from "../types/h2hData";
import { getH2h } from "../apiCalls/clmStats";
import WinLoss from "./WinLoss";
import RecentPlacings from "./RecentPlacings";

function H2hSummary({ players }: h2hProps) {

    const [h2hData, setH2hData] = useState({} as h2hData);

    React.useEffect(() => {
        getH2h(players[0], players[1]).then((h2h) => {if(h2h) setH2hData(h2h)});
    }, [players]);

    return (
        <>
            <header>
                <div id="title">HEAD TO HEAD</div>

                <div id="clm-stats-container">
                    <span id="powered-by">POWERED BY</span>
                    <div id ="image-container">
                        <img src={require("../assets/clm-logo.png")} id="logo" alt="Powered by CLM Stats" />
                        <span id="stats">STATS</span>
                    </div>
                </div>
            </header>


            {players &&
                <div className="h2h-section">
                    <PlayerSummary player={players[0]} side="left" />
                    <PlayerSummary player={players[1]} side="right" />
                </div>
            }

            <TitleBox text="SET COUNT" />

            {h2hData &&
                <div className="winLoss-section">
                    <WinLoss wins={h2hData.p1Wins} side="left" />
                    <WinLoss wins={h2hData.p2Wins} side="right" />
                </div>
            }

            <TitleBox text="RECENT PLACINGS" />

            <div className="placings-section">
                <RecentPlacings player={players[0]} side="left" />
                <RecentPlacings player={players[1]} side = "right" />
            </div>
        </>
    );
}

export default H2hSummary;