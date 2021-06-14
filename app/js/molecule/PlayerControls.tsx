import React from "react";
import { PlayerProgress } from "../atom/PlayerProgress";
import { PlayerPlay } from "../atom/PlayerPlay";
import { PlayerFullscreen } from "../atom/PlayerFullscreen";
import { PlayerSkip } from "../atom/PlayerSkip";

export const PlayerControls: React.FC = () => {
    return (
        <div className="player-controls">
            <PlayerProgress />
            <div className="player-inner">
                <div className="player-group">
                    <PlayerPlay />
                    <div className="player-skip-wrapper">
                        <PlayerSkip seconds={-10} />
                        <PlayerSkip seconds={10} />
                    </div>
                </div>
                <PlayerFullscreen />
            </div>
        </div>
    );
};
