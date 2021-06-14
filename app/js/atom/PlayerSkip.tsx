import React from "react";
import { usePlayer } from "../context/PlayerContext";
import { Icon, RotateLeft, RotateRight } from "../lib/util/Icon";

interface PlayerSkipProps {
    seconds: number;
}

export const PlayerSkip: React.FC<PlayerSkipProps> = ({ seconds }) => {
    const { jumpToSecondsFromCurrent } = usePlayer();

    return (
        <button
            type="button"
            className="player-skip"
            onClick={() => jumpToSecondsFromCurrent(seconds)}>
            {seconds < 0 ? (
                <Icon name="rotate-left" icon={RotateLeft} />
            ) : (
                <Icon name="rotate-right" icon={RotateRight} />
            )}
        </button>
    );
};
