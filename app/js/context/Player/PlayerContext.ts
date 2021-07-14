import { createContext, useContext } from "react";

interface PlayerContextData {
    initVideoPlayer: (el: HTMLVideoElement) => void;
    time: () => string;
    missingTime: () => string;
    timeBy: (abs: number) => string;
    togglePlayState: () => void;
    toggleFullscreenState: () => void;
    toggleMuted: () => void;
    setVideoVolume: (abs: number) => void;
    jumpToAbs: (abs: number) => void;
    jumpToSecondsFromCurrent: (seconds: number) => void;
    onPlayerInteract: () => void;
    onVolumeChange: () => void;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const usePlayer = () => useContext(PlayerContext);
