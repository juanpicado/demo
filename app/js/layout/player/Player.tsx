import React, { useEffect, useRef } from "react";
import { PlayerControls } from "./controls/PlayerControls";
import { usePlayer } from "../../context/Player/PlayerContext";
import { Spinner } from "../atom/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { PlayerProvider } from "../../context/Player/PlayerProvider";
import { App } from "../../../types/app";

interface PlayerProps {
    item: App.ItemDetails;
}

const MediaPlayer: React.FC = () => {
    const { waiting, controls } = useSelector((state: RootState) => state.player);
    const { initVideoPlayer, togglePlayState, onVolumeChange, onPlayerInteract } = usePlayer();
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
                onVolumeChange={onVolumeChange}
            />
            <div className="player-overlay" onClick={togglePlayState} />
            <div className="player-mobile-overlay" onClick={onPlayerInteract} />
            {controls && <PlayerControls />}
        </div>
    );
};

export const Player: React.FC<PlayerProps> = ({ item }) => {
    return (
        <PlayerProvider item={item}>
            <MediaPlayer />
        </PlayerProvider>
    );
};
