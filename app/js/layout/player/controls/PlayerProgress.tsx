import React, { useEffect, useRef, useState } from "react";
import { classes } from "../../../lib/util/Classes";
import { usePlayer } from "../../../context/Player/PlayerContext";
import { useDrag } from "../../../lib/util/Drag";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";

export const PlayerProgress: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const { progress, buffer } = useSelector((state: RootState) => state.progress);
    const { calcTimestamp, jumpToAbs, timeByAbs } = usePlayer();
    const { drag, dragging } = useDrag(containerRef);
    const [indicatorPosition, setIndicatorPosition] = useState<number>(0);
    const [indicatorTime, setIndicatorTime] = useState<string>("");
    const timestamp = calcTimestamp();

    useEffect(() => {
        if (!drag) {
            return;
        }

        jumpToAbs(drag);
        setIndicatorTime(timeByAbs(drag));

        const container = containerRef.current;

        if (!container) {
            return;
        }

        const { width } = container.getBoundingClientRect();

        setIndicatorPosition(drag * width);
    }, [drag]);

    const onMouseMove = (e: React.MouseEvent) => {
        if (dragging) {
            return;
        }

        const container = containerRef.current;

        if (!container) {
            return;
        }

        const { width, left } = container.getBoundingClientRect();

        const x = e.clientX - left;

        setIndicatorPosition(x);
        setIndicatorTime(timeByAbs(x / width));
    };

    return (
        <div className="player-progress">
            <div ref={containerRef} className="player-progress-bar" onMouseMove={onMouseMove}>
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
                        "is-active": dragging,
                    })}
                    style={{ left: indicatorPosition + "px" }}>
                    {indicatorTime && (
                        <span className="player-mouse-indicator-time">{indicatorTime}</span>
                    )}
                </div>
                <div className="player-progress-knob" style={{ left: progress * 100 + "%" }} />
            </div>
            <span
                className={classes({
                    "player-progress-timestamp": true,
                    "is-active": "0" !== timestamp,
                })}>
                {timestamp}
            </span>
        </div>
    );
};
