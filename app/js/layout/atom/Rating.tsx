import React, { useEffect, useRef } from "react";

interface RatingProps {
    vote: number;
}

export const Rating: React.FC<RatingProps> = ({ vote }) => {
    const circleRef = useRef<SVGCircleElement | null>(null);

    useEffect(() => {
        const circle = circleRef.current;

        if (!circle) {
            return;
        }

        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;

        const offset = circumference - (vote / 10) * circumference;

        circle.style.strokeDashoffset = offset.toString();
    }, [vote]);

    return (
        <div className="rating">
            <svg className="rating-ring" viewBox="0 0 120 120">
                <circle
                    ref={circleRef}
                    stroke="white"
                    strokeWidth="6"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                />
            </svg>
            <div className="rating-number">{vote}</div>
        </div>
    );
};
