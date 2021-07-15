import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { PlayerContext } from "./PlayerContext";
import { exitFullscreen, isFullscreen, requestFullscreen } from "../../lib/util/player";
import { useWatchlist } from "../Watchlist/WatchlistProvider";
import { useDispatch } from "react-redux";
import { updateBuffer, updateProgress } from "../../lib/redux/reducer/progress";
import { updateVolume, setMuted } from "../../lib/redux/reducer/volume";
import { setPlaying, setWaiting, setFullscreen, setControls } from "../../lib/redux/reducer/player";
import { App } from "../../../types/app";
import { convertToTimeCode } from "../../lib/util/time";

const videoSrc = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

interface PlayerProvider {
    item: App.Item | App.ItemDetails;
}

export const PlayerProvider: React.FC<PlayerProvider> = ({ item, children }) => {
    const dispatch = useDispatch();
    const watchlist = useWatchlist();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentTimeRef = useRef<number>(0);

    const [player, setPlayer] = useState<HTMLVideoElement | null>(null);

    const initVideoPlayer = (el: HTMLVideoElement) => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(el);
            setPlayer(el);
        } else {
            el.src = videoSrc;
            setPlayer(el);
        }
    };

    const calcProgress = () => {
        if (!player) {
            return;
        }

        dispatch(updateProgress(player.currentTime / player.duration));
    };

    const calcBuffer = () => {
        if (!player) {
            return;
        }

        // const buffer = player.getBufferLength("video");
        //
        // if (buffer) {
        //     const diff = (player.currentTime + buffer) / player.duration;
        //     dispatch(updateBuffer(diff));
        // }
    };

    const timeBy = (abs: number): string => {
        if (!player) {
            return "";
        }

        const time = player.duration * abs;

        return !isNaN(time) ? convertToTimeCode(time) : "";
    };

    const time = (): string => {
        if (!player) {
            return "";
        }

        const time = player.currentTime;

        return !isNaN(time) ? convertToTimeCode(time) : "";
    };

    const missingTime = (): string => {
        if (!player) {
            return "";
        }

        const time = player.duration - player.currentTime;

        return !isNaN(time) ? convertToTimeCode(time) : "";
    };

    const checkWatchlist = () => {
        if (!player) {
            return;
        }

        const x = watchlist.hasProgress(item.id);

        if (x && x > 0) {
            player.currentTime = x;
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
        if (!player) {
            return;
        }

        player.volume = abs;
    };

    const togglePlayState = () => {
        if (!player) {
            return;
        }

        if (player.paused) {
            player.play().catch(() => {
                dispatch(setWaiting(false));
            });
        } else {
            player.pause();
        }
    };

    const toggleMuted = () => {
        if (!player) {
            return;
        }

        player.muted = !player.muted;
    };

    const jumpToAbs = (abs: number) => {
        if (!player) {
            return;
        }

        player.currentTime = player.duration * abs;
        dispatch(updateProgress(player.currentTime / player.duration));
        playerInteract();
    };

    const toggleFullscreenState = () => {
        if (!player) {
            return;
        }

        if (isFullscreen()) {
            exitFullscreen();
            dispatch(setFullscreen(false));
        } else {
            requestFullscreen(player);
            dispatch(setFullscreen(true));
        }
    };

    const jumpToSecondsFromCurrent = (seconds: number) => {
        if (!player) {
            return;
        }

        player.currentTime = player.currentTime + seconds;
        playerInteract();
    };

    /**
     * Event Listeners
     */
    const onLoadedMetadata = () => {
        checkWatchlist();

        if (!player || !player.paused) {
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
        if (!player) {
            return;
        }

        dispatch(setMuted(player.muted));
        dispatch(updateVolume(player.volume));
    };

    const onPlayProgress = () => {
        if (!player) {
            return;
        }

        calcProgress();

        if (!player.paused) {
            requestAnimationFrame(onPlayProgress);
        }
    };

    const onPlayState = () => {
        if (!player) {
            return;
        }

        dispatch(setPlaying(!player.paused));
    };

    const onSeeked = () => calcProgress();

    const onProgress = () => calcBuffer();

    const onTimeUpdate = () => {
        if (!player) {
            return;
        }

        currentTimeRef.current = player.currentTime;
        dispatch(setWaiting(false));
    };

    const onPlayerInteract = () => playerInteract();

    const onWaiting = () => dispatch(setWaiting(true));

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
                time,
                missingTime,
                timeBy,

                //region Controls
                togglePlayState,
                toggleFullscreenState,
                toggleMuted,
                setVideoVolume,
                jumpToAbs,
                jumpToSecondsFromCurrent,
                //endregion

                //region Listeners
                onPlayerInteract,
                eventListeners: {
                    onPlay,
                    onPause,
                    onLoadedMetadata,
                    onVolumeChange,
                    onTimeUpdate,
                    onProgress,
                    onSeeked,
                    onWaiting,
                },
                //endregion
            }}>
            <div className="__slot-watch">{children}</div>
        </PlayerContext.Provider>
    );
};
