import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    onUpdatePlayer1: (callback: (_event: unknown, value: unknown) => void) => {
        ipcRenderer.on("update-player1", callback);
    },
    onUpdatePlayer2: (callback: (_event: unknown, value: unknown) => void) => {
        ipcRenderer.on("update-player2", callback);
    },
    requestPlayer: (num: number) => {
        ipcRenderer.send("request-player" + num, "");
    }
});