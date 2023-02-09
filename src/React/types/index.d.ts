export interface IElectronAPI {
  onUpdatePlayer1: (any) => Promise<void>,
  onUpdatePlayer2: (any) => Promise<void>,
  requestPlayer: (any) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}