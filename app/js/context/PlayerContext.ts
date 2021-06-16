import { createContext, useContext } from "react";
import { Player } from "../../types/player";

interface PlayerContextData {
    initVideoPlayer: (el: HTMLVideoElement) => void;
    playing: boolean;
    waiting: boolean;
    progress: number;
    buffer: number;
    fullscreen: boolean;
    subtitles: Player.Subtitles | null;
    activeSubtitle: string | null;
    toggleSubtitles: (index: string) => void;
    togglePlayState: () => void;
    toggleFullscreenState: () => void;
    jumpToAbs: (abs: number) => void;
    jumpToSecondsFromCurrent: (seconds: number) => void;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const usePlayer = () => useContext(PlayerContext);
