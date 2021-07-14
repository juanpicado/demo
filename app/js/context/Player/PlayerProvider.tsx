import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { PlayerContext } from "./PlayerContext";
import { secondsTimeToTimestamp } from "../../lib/util/Time";
import { exitFullscreen, isFullscreen, requestFullscreen } from "../../lib/util/Player";
import { useWatchlist } from "../Watchlist/WatchlistProvider";
import { useDispatch } from "react-redux";
import { updateBuffer, updateProgress } from "../../lib/reducers/progress";
import { updateVolume, setMuted } from "../../lib/reducers/volume";
import { setPlaying, setWaiting, setFullscreen, setControls } from "../../lib/reducers/player";
import { App } from "../../../types/app";

const videoSrc = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

interface PlayerProvider {
    item: App.Item | App.ItemDetails;
}

export const PlayerProvider: React.FC<PlayerProvider> = ({ item, children }) => {
    const dispatch = useDispatch();
    const watchlist = useWatchlist();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentTimeRef = useRef<number>(0);

    const [video, setVideo] = useState<HTMLVideoElement | null>(null);

    const initVideoPlayer = (el: HTMLVideoElement) => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(el);
            setVideo(el);
        } else {
            el.src = videoSrc;
            setVideo(el);
        }
    };

    const calcProgress = () => {
        if (!video) {
            return;
        }

        dispatch(updateProgress(video.currentTime / video.duration));
    };

    const calcBuffer = () => {
        if (!video) {
            return;
        }

        const end = video.buffered.end(video.buffered.length - 1);
        dispatch(updateBuffer(end / video.duration));
    };

    const timeByAbs = (abs: number): string => {
        if (!video) {
            return "";
        }

        const max = video.duration / 59;
        const t = Math.min(max, Math.max(0, (video.duration * abs) / 59));

        return secondsTimeToTimestamp(t);
    };

    const calcTimestamp = (): string => {
        if (!video) {
            return secondsTimeToTimestamp(0);
        }

        const duration = video.duration / 59;
        const time = video.currentTime / 59;

        return secondsTimeToTimestamp(duration - time);
    };

    const checkWatchlist = () => {
        if (!video) {
            return;
        }

        const x = watchlist.hasProgress(item.id);

        if (x && x > 0) {
            video.currentTime = x;
        }
    };

    const playerInteract = () => {
        dispatch(setControls(true));
        document.body.classList.remove("hide-cursor");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        timeoutRef.current = setTimeout(() => {
            document.body.classList.add("hide-cursor");
            dispatch(setControls(false));
        }, 3000);
    };

    /**
     * Controls
     */
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
                dispatch(setWaiting(false));
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
        dispatch(updateProgress(video.currentTime / video.duration));
        playerInteract();
    };

    const toggleFullscreenState = () => {
        if (!video) {
            return;
        }

        if (isFullscreen()) {
            exitFullscreen();
            dispatch(setFullscreen(false));
        } else {
            requestFullscreen(video);
            dispatch(setFullscreen(true));
        }
    };

    const jumpToSecondsFromCurrent = (seconds: number) => {
        if (!video) {
            return;
        }

        video.currentTime = video.currentTime + seconds;
        playerInteract();
    };

    /**
     * Event Listeners
     */
    const onMetadataLoaded = () => {
        checkWatchlist();
        calcTimestamp();

        if (!video || !video.paused) {
            return;
        }

        togglePlayState();
    };

    const onPlay = () => {
        onPlayProgress();
        onPlayState();
        playerInteract();
    };

    const onPause = () => {
        onPlayState();
    };

    const onVolumeChange = () => {
        if (!video) {
            return;
        }

        dispatch(setMuted(video.muted));
        dispatch(updateVolume(video.volume));
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

        dispatch(setPlaying(!video.paused));
    };

    const onSeeked = () => calcProgress();

    const onWaiting = () => {
        if (!video) {
            return;
        }

        if (video.networkState === video.NETWORK_LOADING) {
            dispatch(setWaiting(true));
        }
    };

    const onProgress = () => calcBuffer();

    const onTimeUpdate = () => {
        if (!video) {
            return;
        }

        currentTimeRef.current = video.currentTime;
        dispatch(setWaiting(false));
    };

    const onPlayerInteract = () => playerInteract();

    useEffect(() => {
        document.addEventListener("mousemove", onPlayerInteract);

        return () => {
            document.removeEventListener("mousemove", onPlayerInteract);
            watchlist.updateProgress(item, currentTimeRef.current);

            if (isFullscreen()) {
                exitFullscreen();
            }

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                initVideoPlayer,
                timeByAbs,
                calcTimestamp,

                //region Controls
                togglePlayState,
                toggleFullscreenState,
                toggleMuted,
                setVideoVolume,
                jumpToAbs,
                jumpToSecondsFromCurrent,
                //endregion

                //region Listeners
                eventListeners: {
                    onPlay,
                    onPause,
                    onMetadataLoaded,
                    onTimeUpdate,
                    onProgress,
                    onSeeked,
                    onWaiting,
                    onVolumeChange,
                    onPlayerInteract,
                },
                //endregion
            }}>
            <div className="__slot-watch">{children}</div>
        </PlayerContext.Provider>
    );
};
