import React, { useEffect, useRef } from "react";
import { PlayerControls } from "../molecule/PlayerControls";
import { usePlayer } from "../context/PlayerContext";

export const Player: React.FC = () => {
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
            <PlayerControls />
        </div>
    );
};
