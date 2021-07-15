import React, { useRef, useState } from "react";
import { PlayerProgress } from "./PlayerProgress";
import { PlayerPlay } from "./PlayerPlay";
import { PlayerFullscreen } from "./PlayerFullscreen";
import { PlayerSkip } from "./PlayerSkip";
import { classes } from "../../../lib/util/classes";
import { ArrowLeft, Icon } from "../../../lib/util/Icon";
import { useRouter } from "next/router";
import { PlayerVolume } from "./PlayerVolume";

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
            <PlayerProgress />
            <div className="player-controls-inner">
                <div className="player-controls-group">
                    <PlayerPlay />
                    <div className="player-skip-wrapper no-touch">
                        <PlayerSkip seconds={-10} />
                        <PlayerSkip seconds={10} />
                    </div>
                    <div className="no-touch">
                        <PlayerVolume onMouseEnter={onVolumeEnter} onMouseLeave={onVolumeLeave} />
                    </div>
                </div>
                <div className="player-controls-group">
                    <PlayerFullscreen />
                </div>
            </div>
        </div>
    );
};
