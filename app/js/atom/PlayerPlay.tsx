import React from "react";
import { usePlayer } from "../context/PlayerContext";
import { Icon, Pause, Play } from "../lib/util/Icon";

export const PlayerPlay: React.FC = () => {
    const { playing, togglePlayState } = usePlayer();

    return (
        <button type="button" className="player-play" onClick={togglePlayState}>
            {playing ? <Icon name="pause" icon={Pause} /> : <Icon name="play" icon={Play} />}
        </button>
    );
};
