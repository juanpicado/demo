import React from "react";
import { convertToTimeCode } from "../../lib/util/time";
import { useWatchlist } from "../../context/Watchlist/WatchlistProvider";

// demo video duration, in a normal environment dataset would include duration
export const demoDuration = 888;

interface CardProgressProps {
    id: number;
}

export const CardProgress: React.FC<CardProgressProps> = ({ id }) => {
    const { hasProgress } = useWatchlist();
    const progress = hasProgress(id);

    if (!progress) return null;

    return (
        <div className="card-progress">
            {convertToTimeCode(progress)}
            <div className="card-progress-bar">
                <div
                    className="card-progress-inner"
                    style={{ width: (progress / demoDuration) * 100 + "%" }}
                />
            </div>
        </div>
    );
};
