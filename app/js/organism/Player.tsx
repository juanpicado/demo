import React, { useEffect, useRef } from "react";
import { PlayerControls } from "../molecule/PlayerControls";
import { usePlayer } from "../context/PlayerContext";
import { App } from "../../types/app";
import { Spinner } from "../atom/Spinner";

interface PlayerProps {
    item: App.ItemDetails;
}

export const Player: React.FC<PlayerProps> = ({ item }) => {
    const { waiting, initVideoPlayer } = usePlayer();
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
            <video ref={videoRef} className="player-video" />
            <PlayerControls title={item.title} />
        </div>
    );
};
