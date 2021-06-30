import React from "react";
import { secondsTimeToTimestamp } from "../../lib/util/Time";

// demo video duration, in a normal environment dataset would include duration
export const demoDuration = 888;

interface CardProgressProps {
    progress: number;
}

export const CardProgress: React.FC<CardProgressProps> = ({ progress }) => {
    return (
        <div className="card-progress">
            {secondsTimeToTimestamp(progress / 60)} min
            <div className="card-progress-bar">
                <div
                    className="card-progress-inner"
                    style={{ width: (progress / demoDuration) * 100 + "%" }}
                />
            </div>
        </div>
    );
};
