import React, { useEffect, useRef, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import Hls from "hls.js";
import { Player } from "../../types/player";

const videoSrc = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

export const PlayerProvider: React.FC = ({ children }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [initialized, setInitialized] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [buffer, setBuffer] = useState<number>(0);
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const [subtitles, setSubtitles] = useState<Player.Subtitles | null>(null);
    const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);

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

        const end = video.buffered.end(video.buffered.length - 1);
        setBuffer(end / video.duration);
    };

    const togglePlayState = () => {
        if (!video) {
            return;
        }

        if (video.paused) {
            video.play().catch(() => {
                setWaiting(false);
            });
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

    const toggleSubtitles = (language: string) => {
        if (!video || !hls) {
            return;
        }

        let lang: string | null = language;

        if (language === activeSubtitle) {
            lang = null;
        }

        setActiveSubtitle(lang);

        for (let i = 0; i < video.textTracks.length; i++) {
            video.textTracks[i].mode =
                lang && video.textTracks[i].language === lang ? "showing" : "hidden";
        }
    };

    //
    // Event Listeners
    //
    const onManifestParsed = () => {
        if (!video || !video.paused) {
            return;
        }

        togglePlayState();
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

    const onSeek = () => calcProgress();

    const onWait = () => {
        if (!video) {
            return;
        }

        if (video.networkState === video.NETWORK_LOADING) {
            setWaiting(true);
        }
    };

    const onProgress = () => calcBuffer();

    const onTimeUpdate = () => setWaiting(false);

    const onSubtitlesLoaded = () => {
        if (!video) {
            return;
        }

        const list: Player.Subtitles = {};

        for (let i = 0; i < video.textTracks.length; i++) {
            video.textTracks[i].mode = "hidden";
            list[video.textTracks[i].language] = video.textTracks[i].label;
        }

        setSubtitles(list);
    };

    useEffect(() => {
        if (!initialized || !video || !container || !hls) {
            return;
        }

        hls.on(Hls.Events.MANIFEST_PARSED, onManifestParsed);
        hls.on(Hls.Events.SUBTITLE_TRACK_LOADED, onSubtitlesLoaded);
        video.addEventListener("play", onPlayProgress);
        video.addEventListener("play", onPlayState);
        video.addEventListener("pause", onPlayState);
        video.addEventListener("timeupdate", onTimeUpdate);
        video.addEventListener("progress", onProgress);
        video.addEventListener("seeked", onSeek);
        video.addEventListener("waiting", onWait);
        container.addEventListener("fullscreenchange", onFullscreen);
        return () => {
            hls.off(Hls.Events.MANIFEST_PARSED, onManifestParsed);
            hls.off(Hls.Events.SUBTITLE_TRACK_LOADED, onSubtitlesLoaded);
            video.removeEventListener("play", onPlayProgress);
            video.removeEventListener("play", onPlayState);
            video.removeEventListener("pause", onPlayState);
            video.removeEventListener("timeupdate", onTimeUpdate);
            video.removeEventListener("progress", onProgress);
            video.removeEventListener("seeked", onSeek);
            container.removeEventListener("fullscreenchange", onFullscreen);
        };
    }, [initialized]);

    return (
        <PlayerContext.Provider
            value={{
                initVideoPlayer,
                playing,
                waiting,
                progress,
                buffer,
                fullscreen,
                subtitles,
                activeSubtitle,
                toggleSubtitles,
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
