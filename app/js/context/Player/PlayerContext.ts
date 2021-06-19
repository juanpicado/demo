import { createContext, useContext } from "react";
import { Player } from "../../../types/player";

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
    playing: boolean;
    waiting: boolean;
    muted: boolean;
    volume: number;
    progress: number;
    buffer: number;
    currentTimeStamp: string;
    fullscreen: boolean;
    controlsActive: boolean;
    setControlsActive: (value: boolean) => void;
    subtitles: Player.Subtitles | null;
    activeSubtitle: string | null;
    toggleSubtitles: (index: string) => void;
    togglePlayState: () => void;
    toggleFullscreenState: () => void;
    toggleMuted: () => void;
    setVideoVolume: (abs: number) => void;
    timeByAbs: (abs: number) => string;
    jumpToAbs: (abs: number) => void;
    jumpToSecondsFromCurrent: (seconds: number) => void;
    eventListeners: PlayerEventListeners;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const usePlayer = () => useContext(PlayerContext);
