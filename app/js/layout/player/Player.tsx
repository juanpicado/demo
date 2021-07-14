import React, { useEffect, useRef } from "react";
import { PlayerControls } from "./controls/PlayerControls";
import { usePlayer } from "../../context/Player/PlayerContext";
import { Spinner } from "../atom/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";

export const Player: React.FC = () => {
    const { waiting, controls } = useSelector((state: RootState) => state.player);
    const { initVideoPlayer, togglePlayState, eventListeners } = usePlayer();
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
                onProgress={eventListeners.onProgress}
                onSeeked={eventListeners.onSeeked}
                onWaiting={eventListeners.onWaiting}
                onVolumeChange={eventListeners.onVolumeChange}
                onTimeUpdate={eventListeners.onTimeUpdate}
            />
            <div className="player-overlay" onClick={togglePlayState} />
            <div className="player-mobile-overlay" onClick={eventListeners.onPlayerInteract} />
            {controls && <PlayerControls />}
        </div>
    );
};
