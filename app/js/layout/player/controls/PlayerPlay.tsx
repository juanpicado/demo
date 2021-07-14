import React from "react";
import { usePlayer } from "../../../context/Player/PlayerContext";
import { Icon, Pause, Play } from "../../../lib/util/Icon";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";

export const PlayerPlay: React.FC = () => {
    const { playing } = useSelector((state: RootState) => state.player);
    const { togglePlayState } = usePlayer();

    return (
        <button type="button" className="player-play" onClick={togglePlayState}>
            {playing ? <Icon name="pause" icon={Pause} /> : <Icon name="play" icon={Play} />}
        </button>
    );
};
