import React from "react";
import { usePlayer } from "../context/PlayerContext";
import { Icon, Maximize, Minimize } from "../lib/util/Icon";

export const PlayerFullscreen: React.FC = () => {
    const { fullscreen, toggleFullscreenState } = usePlayer();

    return (
        <button type="button" className="player-fullscreen" onClick={toggleFullscreenState}>
            {fullscreen ? (
                <Icon name="minimize" icon={Minimize} />
            ) : (
                <Icon name="maximize" icon={Maximize} />
            )}
        </button>
    );
};
