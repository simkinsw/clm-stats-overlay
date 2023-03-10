import { app, BrowserWindow, ipcMain } from "electron";
import * as fs from "fs";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const baseFilePath = "../TournamentStreamHelper-4.91/out/score/team";


const createWindow = (): void => {
  // Create the browser window.
  console.log("creating window");
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  watchPlayer(1, baseFilePath + "/1/player/1", mainWindow);
  watchPlayer(2, baseFilePath + "/2/player/1", mainWindow);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const curIDs = [-1, -1];

function watchPlayer(playerNum: number, filePath: string, window: BrowserWindow) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.watch(filePath + "/id.txt", (_event, _args) => sendPlayerData(playerNum, filePath, window));
    ipcMain.on("request-player" + playerNum, () => sendPlayerData(playerNum, filePath, window));
}

function sendPlayerData(playerNum: number, filePath: string, window: BrowserWindow) {
  let name = "";
  let idArray: number[] = [];
  try {
      name = fs.readFileSync(filePath + "/name.txt", "utf-8");
  } catch (error) {/*do nothing*/}
  try {
      const idString = fs.readFileSync(filePath + "/id.txt", "utf-8");
      idArray = idString.slice(1, idString.length - 1).split("/").map(num => parseInt(num));
  } catch (error) {/*do nothing*/}
  
  if(!!idArray && idArray[0] !== curIDs[playerNum - 1]) {
      curIDs[playerNum - 1] = idArray[0];
      window.webContents.send("update-player" + playerNum, { name, idArray });
  }
}