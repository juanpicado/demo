import { createContext, useContext } from "react";

interface PlayerEventListeners {
    onPlay: () => void;
    onPause: () => void;
    onMetadataLoaded: () => void;
    onTimeUpdate: () => void;
    onProgress: () => void;
    onSeeked: () => void;
    onWaiting: () => void;
    onPlayerInteract: () => void;
    onVolumeChange: () => void;
}

interface PlayerContextData {
    initVideoPlayer: (el: HTMLVideoElement) => void;
    togglePlayState: () => void;
    toggleFullscreenState: () => void;
    toggleMuted: () => void;
    setVideoVolume: (abs: number) => void;
    timeByAbs: (abs: number) => string;
    jumpToAbs: (abs: number) => void;
    jumpToSecondsFromCurrent: (seconds: number) => void;
    calcTimestamp: () => string;
    eventListeners: PlayerEventListeners;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const usePlayer = () => useContext(PlayerContext);
