import React, { useEffect, useRef, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import Hls from "hls.js";

const videoSrc = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

export const PlayerProvider: React.FC = ({ children }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [initialized, setInitialized] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [buffer, setBuffer] = useState<number>(0);
    const [fullscreen, setFullscreen] = useState<boolean>(false);

    const video = videoRef.current;
    const container = containerRef.current;
    const hls = hlsRef.current;

    const initVideoPlayer = (el: HTMLVideoElement) => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(el);
            hlsRef.current = hls;
            videoRef.current = el;
            setInitialized(true);
        } else if (el.canPlayType("application/vnd.apple.mpegurl")) {
            el.src = videoSrc;
            videoRef.current = el;
            setInitialized(true);
        } else {
            // fallback
        }
    };

    const initVideoQualityOptions = () => {
        if (!hls) {
            return;
        }

        console.log(hls.levels);
    };

    const calcProgress = () => {
        if (!video) {
            return;
        }

        setProgress(video.currentTime / video.duration);
    };

    const calcBuffer = () => {
        if (!video) {
            return;
        }

        const end = video.buffered.end(0);
        setBuffer(end / video.duration);
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
    };

    //
    // Event Listeners
    //
    const onManifestParsed = () => {
        if (!hls) {
            return;
        }

        togglePlayState();
        initVideoQualityOptions();

        console.log(hls.levels);
    };

    const onPlayProgress = () => {
        if (!video) {
            return;
        }

        calcProgress();

        if (!video.paused) {
            requestAnimationFrame(onPlayProgress);
        }
    };

    const onPlayState = () => {
        if (!video) {
            return;
        }

        setPlaying(!video.paused);
    };

    const onFullscreen = () => setFullscreen(!!document.fullscreenElement);

    const onSeek = () => {
        calcProgress();
        calcBuffer();
    };

    useEffect(() => {
        if (!initialized || !video || !container || !hls) {
            return;
        }

        hls.once(Hls.Events.MANIFEST_PARSED, onManifestParsed);
        video.addEventListener("play", onPlayProgress);
        video.addEventListener("play", onPlayState);
        video.addEventListener("pause", onPlayState);
        video.addEventListener("timeupdate", calcBuffer);
        video.addEventListener("seeked", onSeek);
        container.addEventListener("fullscreenchange", onFullscreen);
        return () => {
            video.removeEventListener("play", onPlayProgress);
            video.removeEventListener("play", onPlayState);
            video.removeEventListener("pause", onPlayState);
            video.removeEventListener("timeupdate", calcBuffer);
            video.removeEventListener("seeked", onSeek);
            container.removeEventListener("fullscreenchange", onFullscreen);
        };
    }, [initialized]);

    return (
        <PlayerContext.Provider
            value={{
                initVideoPlayer,
                playing,
                progress,
                buffer,
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
