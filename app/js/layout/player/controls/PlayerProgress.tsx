import React, { useEffect, useRef, useState } from "react";
import { classes } from "../../../lib/util/classes";
import { usePlayer } from "../../../context/Player/PlayerContext";
import { useDrag } from "../../../lib/util/drag";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";

export const PlayerProgress: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const { progress, buffer } = useSelector((state: RootState) => state.progress);
    const { time, missingTime, jumpToAbs, timeBy } = usePlayer();
    const { drag, dragging } = useDrag(containerRef);
    const [indicatorPosition, setIndicatorPosition] = useState<number>(0);
    const [indicatorTime, setIndicatorTime] = useState<string>("");

    useEffect(() => {
        if (!drag) {
            return;
        }

        jumpToAbs(drag);
        setIndicatorTime(timeBy(drag));

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
        const abs = Math.min(1, Math.max(0, x / width));

        setIndicatorPosition(x);
        setIndicatorTime(timeBy(abs));
    };

    return (
        <div className="player-progress">
            <span
                className={classes({
                    "player-progress-timestamp": true,
                    "is-active": "0" !== time(),
                })}>
                {time()}
            </span>
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
                    "is-right": true,
                    "is-active": "0" !== missingTime(),
                })}>
                {missingTime()}
            </span>
        </div>
    );
};
