import React from "react";
import { Icon, ChevronLeft, ChevronRight } from "../../lib/util/Icon";
import { classes } from "../../lib/util/classes";

interface SliderControlsProps {
    isBeginning: boolean;
    isEnd: boolean;
    onPrev: () => void;
    onNext: () => void;
}

export const SliderControls: React.FC<SliderControlsProps> = ({
    onPrev,
    onNext,
    isBeginning,
    isEnd,
}) => {
    return (
        <div className="slider-controls">
            <button
                type="button"
                className={classes({
                    "slider-controls-prev": true,
                    "is-active": !isBeginning,
                })}
                onClick={onPrev}>
                <Icon name="chevron-left" icon={ChevronLeft} />
            </button>
            <button
                type="button"
                className={classes({
                    "slider-controls-next": true,
                    "is-active": !isEnd,
                })}
                onClick={onNext}>
                <Icon name="chevron-right" icon={ChevronRight} />
            </button>
        </div>
    );
};
