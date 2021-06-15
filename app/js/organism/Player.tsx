import React, { useEffect, useRef } from "react";
import { PlayerControls } from "../molecule/PlayerControls";
import { usePlayer } from "../context/PlayerContext";
import { App } from "../../types/app";

interface PlayerProps {
    item: App.ItemDetails;
}

export const Player: React.FC<PlayerProps> = ({ item }) => {
    const { initVideoPlayer } = usePlayer();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }

        initVideoPlayer(videoRef.current);
    }, []);

    return (
        <div className="player">
            <video ref={videoRef} className="player-video" src="/test.mp4" playsInline />
            <PlayerControls title={item.title} />
        </div>
    );
};
