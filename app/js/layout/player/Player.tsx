import React, { useEffect, useRef } from "react";
import { PlayerControls } from "./controls/PlayerControls";
import { usePlayer } from "../../context/Player/PlayerContext";
import { Spinner } from "../atom/Spinner";
import { useWatchlist } from "../../context/Watchlist/WatchlistProvider";
import { App } from "../../../types/app";

interface PlayerProps {
    item: App.ItemDetails;
}

export const Player: React.FC<PlayerProps> = ({ item }) => {
    const { updateProgress } = useWatchlist();
    const {
        waiting,
        controlsActive,
        initVideoPlayer,
        togglePlayState,
        eventListeners,
    } = usePlayer();
    const currentTimeRef = useRef<number>(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }

        initVideoPlayer(videoRef.current);

        return () => updateProgress(item, currentTimeRef.current);
    }, []);

    const onTimeUpdate = () => {
        eventListeners.onTimeUpdate();

        if (!videoRef.current) {
            return;
        }

        currentTimeRef.current = videoRef.current.currentTime;
    };

    return (
        <div className="player">
            {waiting && (
                <div className="player-loading">
                    <Spinner />
                </div>
            )}
            <video
                ref={videoRef}
                className="player-video"
                playsInline
                onPlay={eventListeners.onPlay}
                onPause={eventListeners.onPause}
                onLoadedMetadata={eventListeners.onMetadataLoaded}
                onProgress={eventListeners.onProgress}
                onSeeked={eventListeners.onSeeked}
                onWaiting={eventListeners.onWaiting}
                onVolumeChange={eventListeners.onVolumeChange}
                onTimeUpdate={onTimeUpdate}
            />
            <div className="player-overlay" onClick={togglePlayState} />
            <div className="player-mobile-overlay" onClick={eventListeners.onPlayerInteract} />
            {controlsActive && <PlayerControls />}
        </div>
    );
};
