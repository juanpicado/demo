import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { PlayerContext } from "./PlayerContext";
import { Player } from "../../../types/player";
import { secondsTimeToTimestamp } from "../../lib/util/Time";
import { exitFullscreen, isFullscreen, requestFullscreen } from "../../lib/util/Player";

const videoSrc = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

export const PlayerProvider: React.FC = ({ children }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);
    const mouseMoveTimeout = useRef<NodeJS.Timeout | null>(null);

    const [initialized, setInitialized] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(false);
    const [muted, setMuted] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);
    const [progress, setProgress] = useState<number>(0);
    const [buffer, setBuffer] = useState<number>(0);
    const [currentTimeStamp, setCurrentTimeStamp] = useState<string>("0");
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const [subtitles, setSubtitles] = useState<Player.Subtitles | null>(null);
    const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);
    const [controlsActive, setControlsActive] = useState<boolean>(true);

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
        } else {
            el.src = videoSrc;
            videoRef.current = el;
            setInitialized(true);
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

    const setVideoVolume = (abs: number) => {
        if (!video) {
            return;
        }

        video.volume = abs;
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

    const toggleMuted = () => {
        if (!video) {
            return;
        }

        video.muted = !video.muted;
    };

    const jumpToAbs = (abs: number) => {
        if (!video) {
            return;
        }

        video.currentTime = video.duration * abs;
        setProgress(video.currentTime / video.duration);
        onPlayerInteract();
    };

    const timeByAbs = (abs: number): string => {
        if (!video) {
            return "";
        }

        const max = video.duration / 59;
        const t = Math.min(max, Math.max(0, (video.duration * abs) / 59));

        return secondsTimeToTimestamp(t);
    };

    const toggleFullscreenState = () => {
        if (!container || !video) {
            return;
        }

        if (isFullscreen()) {
            exitFullscreen();
            setFullscreen(false);
        } else {
            requestFullscreen(video);
            setFullscreen(true);
        }
    };

    const jumpToSecondsFromCurrent = (seconds: number) => {
        if (!video) {
            return;
        }

        video.currentTime = video.currentTime + seconds;
        onPlayerInteract();
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

    const calcTimestamp = () => {
        if (!video) {
            return;
        }

        const duration = video.duration / 59;
        const time = video.currentTime / 59;

        setCurrentTimeStamp(secondsTimeToTimestamp(duration - time));
    };

    //
    // Event Listeners
    //
    const onVolumeChange = () => {
        if (!video) {
            return;
        }

        setMuted(video.muted);
        setVolume(video.volume);
    };

    const onMetadataLoaded = () => calcTimestamp();

    const onManifestParsed = () => {
        if (!video || !video.paused) {
            return;
        }

        togglePlayState();
    };

    const onPlay = () => {
        onPlayProgress();
        onPlayState();
        onPlayerInteract();
    };

    const onPause = () => {
        onPlayState();
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

    const onSeeked = () => calcProgress();

    const onWaiting = () => {
        if (!video) {
            return;
        }

        if (video.networkState === video.NETWORK_LOADING) {
            setWaiting(true);
        }
    };

    const onProgress = () => calcBuffer();

    const onTimeUpdate = () => {
        setWaiting(false);
        calcTimestamp();
    };

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

    const onPlayerInteract = () => {
        setControlsActive(true);
        document.body.classList.remove("hide-cursor");

        if (mouseMoveTimeout.current) {
            clearTimeout(mouseMoveTimeout.current);
            mouseMoveTimeout.current = null;
        }

        mouseMoveTimeout.current = setTimeout(() => {
            document.body.classList.add("hide-cursor");
            setControlsActive(false);
        }, 3000);
    };

    const onMouseMove = () => onPlayerInteract();

    useEffect(() => {
        document.documentElement.classList.add("is-landscape");
        document.documentElement.style.width = window.innerHeight + "px";

        return () => {
            document.documentElement.style.removeProperty("width");
            document.documentElement.classList.remove("is-landscape");

            if (isFullscreen()) {
                exitFullscreen();
            }
        };
    }, []);

    useEffect(() => {
        if (!initialized || !hls) {
            return;
        }

        hls.on(Hls.Events.MANIFEST_PARSED, onManifestParsed);
        hls.on(Hls.Events.SUBTITLE_TRACK_LOADED, onSubtitlesLoaded);
        document.addEventListener("mousemove", onMouseMove);
        return () => {
            hls.off(Hls.Events.MANIFEST_PARSED, onManifestParsed);
            hls.off(Hls.Events.SUBTITLE_TRACK_LOADED, onSubtitlesLoaded);
            document.removeEventListener("mousemove", onMouseMove);

            if (mouseMoveTimeout.current) {
                clearTimeout(mouseMoveTimeout.current);
            }
        };
    }, [initialized]);

    return (
        <PlayerContext.Provider
            value={{
                initVideoPlayer,
                playing,
                waiting,
                muted,
                volume,
                progress,
                buffer,
                currentTimeStamp,
                fullscreen,
                controlsActive,
                setControlsActive,
                subtitles,
                activeSubtitle,
                toggleSubtitles,
                togglePlayState,
                toggleFullscreenState,
                toggleMuted,
                setVideoVolume,
                timeByAbs,
                jumpToAbs,
                jumpToSecondsFromCurrent,
                eventListeners: {
                    onPlay,
                    onPause,
                    onMetadataLoaded,
                    onTimeUpdate,
                    onProgress,
                    onSeeked,
                    onWaiting,
                    onPlayerInteract,
                    onVolumeChange,
                },
            }}>
            <div ref={containerRef} className="__slot-watch">
                {children}
            </div>
        </PlayerContext.Provider>
    );
};
