import React, { useRef, useState } from "react";
import { PlayerProgress } from "../atom/PlayerProgress";
import { PlayerPlay } from "../atom/PlayerPlay";
import { PlayerFullscreen } from "../atom/PlayerFullscreen";
import { PlayerSkip } from "../atom/PlayerSkip";
import { PlayerSubtitles } from "../atom/PlayerSubtitles";
import { classes } from "../lib/util/Classes";
import { ArrowLeft, Icon } from "../lib/util/Icon";
import { useRouter } from "next/router";

interface PlayerControls {
    title: string;
}

export const PlayerControls: React.FC<PlayerControls> = ({ title }) => {
    const router = useRouter();
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
            <button type="button" className="player-controls-back" onClick={router.back}>
                <Icon name="arrow-left" icon={ArrowLeft} />
            </button>
            <PlayerProgress />
            <div className="player-controls-inner">
                <div className="player-controls-group">
                    <PlayerPlay />
                    <div className="player-skip-wrapper">
                        <PlayerSkip seconds={-10} />
                        <PlayerSkip seconds={10} />
                    </div>
                    <div className="player-controls-title">{title}</div>
                </div>
                <div className="player-controls-group">
                    <PlayerSubtitles onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
                    <PlayerFullscreen />
                </div>
            </div>
        </div>
    );
};
