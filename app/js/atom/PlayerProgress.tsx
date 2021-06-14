import React, { useEffect, useRef, useState } from "react";
import { classes } from "../lib/util/Classes";
import { usePlayer } from "../context/PlayerContext";

export const PlayerProgress: React.FC = () => {
    const { progress, jumpToAbs } = usePlayer();
    const containerRef = useRef<HTMLButtonElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const [indicatorActive, setIndicatorActive] = useState<boolean>(false);

    const onClick = (e: React.MouseEvent) => {
        const indicator = indicatorRef.current;
        const container = containerRef.current;

        if (!indicator || !container) {
            return;
        }

        const { width, left } = container.getBoundingClientRect();

        const x = (e.clientX - left) / width;
        jumpToAbs(x);
    };

    const onMouseEnter = () => {
        setIndicatorActive(true);
    };

    const onMouseLeave = () => {
        setIndicatorActive(false);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        const indicator = indicatorRef.current;
        const container = containerRef.current;

        if (!indicator || !container) {
            return;
        }

        indicator.style.left = e.clientX - container.offsetLeft + "px";
    };

    return (
        <button
            ref={containerRef}
            className="player-progress"
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}>
            <div className="player-progress-frame">
                <div
                    className="player-progress-inner"
                    style={{ transform: `scaleX(${progress})` }}
                />
                <div
                    ref={indicatorRef}
                    className={classes({
                        "player-mouse-indicator": true,
                        "is-active": indicatorActive,
                    })}
                />
            </div>
            <div className="player-progress-knob" style={{ left: progress * 100 + "%" }} />
        </button>
    );
};
