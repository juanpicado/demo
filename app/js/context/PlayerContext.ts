import { createContext, useContext } from "react";

interface PlayerContextData {
    initVideoPlayer: (el: HTMLVideoElement) => void;
    playing: boolean;
    progress: number;
    fullscreen: boolean;
    togglePlayState: () => void;
    toggleFullscreenState: () => void;
    jumpToAbs: (abs: number) => void;
    jumpToSecondsFromCurrent: (seconds: number) => void;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const usePlayer = () => useContext(PlayerContext);
