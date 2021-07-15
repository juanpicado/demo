import React, { useEffect, useRef, useState } from "react";
import dashjs, { MediaPlayerClass } from "dashjs";
import { PlayerContext } from "./PlayerContext";
import { exitFullscreen, isFullscreen, requestFullscreen } from "../../lib/util/player";
import { useWatchlist } from "../Watchlist/WatchlistProvider";
import { useDispatch } from "react-redux";
import { updateBuffer, updateProgress } from "../../lib/reducers/progress";
import { updateVolume, setMuted } from "../../lib/reducers/volume";
import { setPlaying, setWaiting, setFullscreen, setControls } from "../../lib/reducers/player";
import { App } from "../../../types/app";

const videoSrc = "https://dash.akamaized.net/dash264/TestCasesHD/2b/qualcomm/1/MultiResMPEG2.mpd";

interface PlayerProvider {
    item: App.Item | App.ItemDetails;
}

export const PlayerProvider: React.FC<PlayerProvider> = ({ item, children }) => {
    const dispatch = useDispatch();
    const watchlist = useWatchlist();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentTimeRef = useRef<number>(0);

    const [player, setPlayer] = useState<MediaPlayerClass | null>(null);

    const initVideoPlayer = (el: HTMLVideoElement) => {
        const player = dashjs.MediaPlayer().create();
        player.initialize(el, videoSrc, true);
        setPlayer(player);
        videoRef.current = el;
    };

    const calcProgress = () => {
        if (!player) {
            return;
        }

        dispatch(updateProgress(player.time() / player.duration()));
    };

    const calcBuffer = () => {
        if (!player) {
            return;
        }

        const buffer = player.getBufferLength("video");

        if (buffer) {
            const diff = (player.time() + buffer) / player.duration();
            dispatch(updateBuffer(diff));
        }
    };

    const timeBy = (abs: number): string => {
        if (!player) {
            return "";
        }

        const time = player.duration() * abs;

        return !isNaN(time) ? player.convertToTimeCode(time) : "";
    };

    const time = (): string => {
        if (!player) {
            return "";
        }

        const time = player.time();

        return !isNaN(time) ? player.convertToTimeCode(time) : "";
    };

    const missingTime = (): string => {
        if (!player) {
            return "";
        }

        const time = player.duration() - player.time();

        return !isNaN(time) ? player.convertToTimeCode(time) : "";
    };

    const checkWatchlist = () => {
        if (!player) {
            return;
        }

        const x = watchlist.hasProgress(item.id);

        if (x && x > 0) {
            player.seek(x);
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

        player.setVolume(abs);
    };

    const togglePlayState = () => {
        if (!player) {
            return;
        }

        if (player.isPaused()) {
            player.play();
        } else {
            player.pause();
        }
    };

    const toggleMuted = () => {
        if (!player) {
            return;
        }

        player.setMute(!player.isMuted());
    };

    const jumpToAbs = (abs: number) => {
        if (!player) {
            return;
        }

        player.seek(player.duration() * abs);
        dispatch(updateProgress(player.time() / player.duration()));
        playerInteract();
    };

    const toggleFullscreenState = () => {
        if (!videoRef.current) {
            return;
        }

        if (isFullscreen()) {
            exitFullscreen();
            dispatch(setFullscreen(false));
        } else {
            requestFullscreen(videoRef.current);
            dispatch(setFullscreen(true));
        }
    };

    const jumpToSecondsFromCurrent = (seconds: number) => {
        if (!player) {
            return;
        }

        player.seek(player.time() + seconds);
        playerInteract();
    };

    /**
     * Event Listeners
     */
    const onMetadataLoaded = () => checkWatchlist();

    const onPlay = () => {
        onPlayProgress();
        onPlayState();
        playerInteract();
    };

    const onPaused = () => {
        onPlayState();
    };

    const onVolumeChange = () => {
        if (!player) {
            return;
        }

        dispatch(setMuted(player.isMuted()));
        dispatch(updateVolume(player.getVolume()));
    };

    const onPlayProgress = () => {
        if (!player) {
            return;
        }

        calcProgress();

        if (!player.isPaused()) {
            requestAnimationFrame(onPlayProgress);
        }
    };

    const onPlayState = () => {
        if (!player) {
            return;
        }

        dispatch(setPlaying(!player.isPaused()));
    };

    const onSeeked = () => calcProgress();

    const onProgress = () => calcBuffer();

    const onTimeUpdate = () => {
        if (!player) {
            return;
        }

        currentTimeRef.current = player.time();
        dispatch(setWaiting(false));
    };

    const onPlayerInteract = () => playerInteract();

    const onWaiting = () => dispatch(setWaiting(true));

    const initListeners = () => {
        if (!player) {
            return;
        }

        player.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, onMetadataLoaded);
        player.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, onPlay);
        player.on(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, onPaused);
        player.on(dashjs.MediaPlayer.events.PLAYBACK_TIME_UPDATED, onTimeUpdate);
        player.on(dashjs.MediaPlayer.events.PLAYBACK_PROGRESS, onProgress);
        player.on(dashjs.MediaPlayer.events.PLAYBACK_WAITING, onWaiting);
        player.on(dashjs.MediaPlayer.events.PLAYBACK_SEEKED, onSeeked);
    };

    const removeListeners = () => {
        if (!player) {
            return;
        }

        player.off(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, onMetadataLoaded);
        player.off(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, onPlay);
        player.off(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, onPaused);
        player.off(dashjs.MediaPlayer.events.PLAYBACK_TIME_UPDATED, onTimeUpdate);
        player.off(dashjs.MediaPlayer.events.PLAYBACK_PROGRESS, onProgress);
        player.off(dashjs.MediaPlayer.events.PLAYBACK_WAITING, onWaiting);
        player.off(dashjs.MediaPlayer.events.PLAYBACK_SEEKED, onSeeked);
    };

    useEffect(() => {
        initListeners();
        return () => removeListeners();
    }, [player]);

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
                onVolumeChange,
                onPlayerInteract,
                //endregion
            }}>
            <div className="__slot-watch">{children}</div>
        </PlayerContext.Provider>
    );
};
