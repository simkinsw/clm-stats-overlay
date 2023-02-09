import React, { useState } from "react";
import "./App.css";
import H2hSummary from "./components/H2hSummary";
import { Player } from "./types/player";
import { appProps } from "./types/propsTypes";

function App({ ranks }: appProps) {
    const [player1, setPlayer1] = useState({name:"Dragoid", idArray:[123] } as Player);
    const [player2, setPlayer2] = useState({name:"Forest", idArray:[321]} as Player);

    console.log("rendering App");

    React.useEffect(() => {
        console.log("app use effect");
        window.electronAPI.onUpdatePlayer1((_event: unknown, value: Player) => {
            value.rank = ranks[value.name] ?? -1;
            setPlayer1(value);
        });
        window.electronAPI.onUpdatePlayer2((_event: unknown, value: Player) => {
            value.rank = ranks[value.name] ?? -1;
            setPlayer2(value);
        });

        window.electronAPI.requestPlayer(1);
        window.electronAPI.requestPlayer(2);

        return () => {
            window.electronAPI.onUpdatePlayer1((): unknown => undefined);
            window.electronAPI.onUpdatePlayer2((): unknown => undefined);
        }
    }, [ranks])

    return (
        <div className="OverlayContainer">
            <H2hSummary players={[player1, player2]} />
        </div>
    );
}

export default App;
