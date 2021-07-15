import React, { useEffect, useRef } from "react";
import { Icon, Volume, VolumeMuted } from "../../../lib/util/Icon";
import { useDrag } from "../../../lib/util/drag";
import { usePlayer } from "../../../context/Player/PlayerContext";
import { classes } from "../../../lib/util/classes";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";

interface PlayerVolumeProps {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const PlayerVolume: React.FC<PlayerVolumeProps> = ({ onMouseEnter, onMouseLeave }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { toggleMuted, setVideoVolume } = usePlayer();
    const { volume, muted } = useSelector((state: RootState) => state.volume);
    const { drag, dragging } = useDrag(containerRef, { isVertical: true });

    useEffect(() => {
        if (!drag) {
            return;
        }

        setVideoVolume(drag);
    }, [drag]);

    return (
        <div
            className={classes({
                "player-volume": true,
                "is-muted": muted,
                "is-dragging": dragging,
            })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <button type="button" className="player-volume-button" onClick={toggleMuted}>
                {muted ? (
                    <Icon name="volume-muted" icon={VolumeMuted} />
                ) : (
                    <Icon name="volume" icon={Volume} />
                )}
            </button>
            <div className="player-volume-progress-wrapper">
                <div className="player-volume-progress-frame">
                    <div className="player-volume-progress" ref={containerRef}>
                        <div
                            className="player-volume-progress-inner"
                            style={{ transform: `scaleY(${volume})` }}
                        />
                    </div>
                    <div
                        className="player-volume-progress-knob"
                        style={{ bottom: volume * 100 + "%" }}
                    />
                </div>
            </div>
        </div>
    );
};
