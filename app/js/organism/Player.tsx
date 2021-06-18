import React, { useEffect, useRef, useState } from "react";
import { PlayerControls } from "../molecule/PlayerControls";
import { usePlayer } from "../context/Player/PlayerContext";
import { App } from "../../types/app";
import { Spinner } from "../atom/Spinner";

interface PlayerProps {
    item: App.ItemDetails;
}

export const Player: React.FC<PlayerProps> = ({ item }) => {
    const {
        waiting,
        controlsActive,
        initVideoPlayer,
        togglePlayState,
        eventListeners,
    } = usePlayer();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }

        initVideoPlayer(videoRef.current);
    }, []);

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
                onTimeUpdate={eventListeners.onTimeUpdate}
                onProgress={eventListeners.onProgress}
                onSeeked={eventListeners.onSeeked}
                onWaiting={eventListeners.onWaiting}
            />
            <div className="player-overlay" onClick={togglePlayState} />
            <div className="player-mobile-overlay" onClick={eventListeners.onPlayerInteract} />
            {controlsActive && <PlayerControls title={item.title} />}
        </div>
    );
};
