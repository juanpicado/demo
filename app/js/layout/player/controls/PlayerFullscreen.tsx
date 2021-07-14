import React from "react";
import { usePlayer } from "../../../context/Player/PlayerContext";
import { Icon, Maximize, Minimize } from "../../../lib/util/Icon";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";

export const PlayerFullscreen: React.FC = () => {
    const { fullscreen } = useSelector((state: RootState) => state.player);
    const { toggleFullscreenState } = usePlayer();

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
