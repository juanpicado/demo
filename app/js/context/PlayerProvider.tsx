import React, { useEffect, useRef, useState } from "react";
import { PlayerContext } from "./PlayerContext";

export const PlayerProvider: React.FC = ({ children }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const video = videoRef.current;
    const container = containerRef.current;

    useEffect(() => {
        if (!initialized || !video || !container) {
            return;
        }

        const updateProgress = () => {
            calcProgress();
            if (!video.paused) {
                requestAnimationFrame(updateProgress);
            }
        };

        const updatePlayState = () => setPlaying(!video.paused);

        const updateFullscreen = () => setFullscreen(!!document.fullscreenElement);

        video.addEventListener("play", updateProgress);
        video.addEventListener("play", updatePlayState);
        video.addEventListener("pause", updatePlayState);
        container.addEventListener("fullscreenchange", updateFullscreen);
        return () => {
            video.removeEventListener("play", updateProgress);
            video.removeEventListener("play", updatePlayState);
            video.removeEventListener("pause", updatePlayState);
            container.removeEventListener("fullscreenchange", updateFullscreen);
        };
    }, [initialized]);

    const calcProgress = () => {
        if (!video) {
            return;
        }

        setProgress(video.currentTime / video.duration);
    };

    const initVideoPlayer = (el: HTMLVideoElement) => {
        videoRef.current = el;
        setInitialized(true);
    };

    const togglePlayState = () => {
        if (!video) {
            return;
        }

        if (video.paused) {
            video.play().catch(console.error);
        } else {
            video.pause();
        }
    };

    const jumpToAbs = (abs: number) => {
        if (!video) {
            return;
        }

        video.currentTime = video.duration * abs;
        calcProgress();
    };

    const toggleFullscreenState = () => {
        if (!container) {
            return;
        }

        if (document.fullscreenElement) {
            document.exitFullscreen().catch(console.error);
        } else {
            container.requestFullscreen().catch(console.error);
        }
    };

    const jumpToSecondsFromCurrent = (seconds: number) => {
        if (!video) {
            return;
        }

        video.currentTime = video.currentTime + seconds;
        calcProgress();
    };

    return (
        <PlayerContext.Provider
            value={{
                initVideoPlayer,
                playing,
                progress,
                fullscreen,
                togglePlayState,
                toggleFullscreenState,
                jumpToAbs,
                jumpToSecondsFromCurrent,
            }}>
            <div ref={containerRef} className="__slot-watch">
                {children}
            </div>
        </PlayerContext.Provider>
    );
};
