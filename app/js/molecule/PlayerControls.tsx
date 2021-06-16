import React, { useRef, useState } from "react";
import { PlayerProgress } from "../atom/PlayerProgress";
import { PlayerPlay } from "../atom/PlayerPlay";
import { PlayerFullscreen } from "../atom/PlayerFullscreen";
import { PlayerSkip } from "../atom/PlayerSkip";
import { PlayerSubtitles } from "../atom/PlayerSubtitles";
import { classes } from "../lib/util/Classes";

interface PlayerControls {
    title: string;
}

export const PlayerControls: React.FC<PlayerControls> = () => {
    const subtitlesTimeout = useRef<NodeJS.Timeout | null>(null);
    const [subtitlesActive, setSubtitlesActive] = useState<boolean>(false);

    const onMouseEnter = () => {
        if (subtitlesTimeout.current) {
            clearTimeout(subtitlesTimeout.current);
        }

        setSubtitlesActive(true);
    };

    const onMouseLeave = () => {
        subtitlesTimeout.current = setTimeout(() => setSubtitlesActive(false), 250);
    };

    return (
        <div
            className={classes({
                "player-controls": true,
                "subtitles-active": subtitlesActive,
            })}>
            <PlayerProgress />
            <div className="player-inner">
                <div className="player-group">
                    <PlayerPlay />
                    <div className="player-skip-wrapper">
                        <PlayerSkip seconds={-10} />
                        <PlayerSkip seconds={10} />
                    </div>
                </div>
                <div className="player-group">
                    <PlayerSubtitles onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
                    <PlayerFullscreen />
                </div>
            </div>
        </div>
    );
};
