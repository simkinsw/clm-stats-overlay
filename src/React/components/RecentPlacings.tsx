import React, { useState } from "react";
import { getRecentPlacements } from "../apiCalls/startGG";
import { placement } from "../types/placements";
import { placementsProps } from "../types/propsTypes";

function RecentPlacements({ player, side }: placementsProps) {

    const [placements, setPlacements] = useState([] as placement[]);

    React.useEffect(() => {
        getRecentPlacements(player.idArray[0]).then((placements: any) => setPlacements(placements));
    }, [player]);

    return (
        <div className={"player-box " + side}>
            <>
                {placements && 
                    placements.map((placement) => {
                        return (
                            side === "left" ? (
                                    <div className="placement">
                                        <span className="tournamentName">{placement.tournamentName}</span>
                                        <span> - </span>
                                        <span className="placementString">{`${placement.placing}/${placement.totalEntrants}`}</span>
                                    </div>
                                ) : (
                                    <div className="placement">
                                        <span className="placementString">{`${placement.placing}/${placement.totalEntrants}`}</span>
                                        <span> - </span>
                                        <span className="tournamentName">{placement.tournamentName}</span>
                                    </div>
                                )      
                        )
                    })
                }
            </>
        </div>
    );

}

export default RecentPlacements;

