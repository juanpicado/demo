import React, { useRef, useState } from "react";
import { PlayerProgress } from "../atom/PlayerProgress";
import { PlayerPlay } from "../atom/PlayerPlay";
import { PlayerFullscreen } from "../atom/PlayerFullscreen";
import { PlayerSkip } from "../atom/PlayerSkip";
import { classes } from "../lib/util/Classes";
import { ArrowLeft, Icon } from "../lib/util/Icon";
import { useRouter } from "next/router";
import { PlayerVolume } from "../atom/PlayerVolume";
import { PlayerVolumeTouch } from "../atom/PlayerVolumeTouch";

export const PlayerControls: React.FC = () => {
    const router = useRouter();
    const volumeTimeout = useRef<NodeJS.Timeout | null>(null);
    const [volumeActive, setVolumeActive] = useState<boolean>(false);

    const onVolumeEnter = () => {
        if (volumeTimeout.current) {
            clearTimeout(volumeTimeout.current);
        }

        setVolumeActive(true);
    };

    const onVolumeLeave = () => {
        volumeTimeout.current = setTimeout(() => setVolumeActive(false), 250);
    };

    return (
        <div
            className={classes({
                "player-controls": true,
                "volume-active": volumeActive,
            })}>
            <button type="button" className="player-controls-back" onClick={router.back}>
                <Icon name="arrow-left" icon={ArrowLeft} />
            </button>
            <div className="player-default">
                <PlayerProgress />
            </div>
            <div className="player-touch">
                <PlayerProgress isTouch />
            </div>
            <div className="player-controls-inner">
                <div className="player-controls-group">
                    <PlayerPlay />
                    <div className="player-skip-wrapper">
                        <PlayerSkip seconds={-10} />
                        <PlayerSkip seconds={10} />
                    </div>
                    <div className="player-default">
                        <PlayerVolume onMouseEnter={onVolumeEnter} onMouseLeave={onVolumeLeave} />
                    </div>
                    <div className="player-touch">
                        <PlayerVolumeTouch />
                    </div>
                </div>
                <div className="player-controls-group">
                    <PlayerFullscreen />
                </div>
            </div>
        </div>
    );
};
