import React, { useEffect, useRef, useState } from "react";
import { PlayerControls } from "../molecule/PlayerControls";
import { usePlayer } from "../context/PlayerContext";
import { App } from "../../types/app";
import { Spinner } from "../atom/Spinner";

interface PlayerProps {
    item: App.ItemDetails;
}

export const Player: React.FC<PlayerProps> = ({ item }) => {
    const { waiting, controlsActive, initVideoPlayer, togglePlayState } = usePlayer();
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
            <video ref={videoRef} className="player-video" playsInline />
            <div className="player-overlay" onClick={togglePlayState} />
            {controlsActive && <PlayerControls title={item.title} />}
        </div>
    );
};
