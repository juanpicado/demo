import React, { useRef, useState } from "react";
import { classes } from "../lib/util/Classes";
import { usePlayer } from "../context/Player/PlayerContext";

interface PlayerProgressProps {
    isTouch?: boolean;
}

export const PlayerProgress: React.FC<PlayerProgressProps> = ({ isTouch }) => {
    const { progress, buffer, currentTimeStamp, jumpToAbs, timeByAbs } = usePlayer();
    const containerRef = useRef<HTMLButtonElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const [indicatorActive, setIndicatorActive] = useState<boolean>(false);
    const [indicatorPosition, setIndicatorPosition] = useState<number>(0);
    const [indicatorTime, setIndicatorTime] = useState<string>("");

    const onClick = (e: React.MouseEvent) => {
        const indicator = indicatorRef.current;
        const container = containerRef.current;

        if (!indicator || !container) {
            return;
        }

        const { width, height, left, bottom } = container.getBoundingClientRect();

        const x = isTouch ? (e.clientY - bottom) / height : (e.clientX - left) / width;
        jumpToAbs(Math.abs(x));
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

        const { width, left } = container.getBoundingClientRect();

        const x = e.clientX - left;

        setIndicatorPosition(x);
        setIndicatorTime(timeByAbs(x / width));
    };

    return (
        <div className="player-progress">
            <button
                ref={containerRef}
                className="player-progress-bar"
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
                        className="player-progress-buffer"
                        style={{ transform: `scaleX(${buffer})` }}
                    />
                </div>
                <div
                    ref={indicatorRef}
                    className={classes({
                        "player-mouse-indicator": true,
                        "is-active": indicatorActive,
                    })}
                    style={{ left: indicatorPosition + "px" }}>
                    {indicatorTime && (
                        <span className="player-mouse-indicator-time">{indicatorTime}</span>
                    )}
                </div>
                <div className="player-progress-knob" style={{ left: progress * 100 + "%" }} />
            </button>
            <span
                className={classes({
                    "player-progress-timestamp": true,
                    "is-active": "0" !== currentTimeStamp,
                })}>
                {currentTimeStamp}
            </span>
        </div>
    );
};
