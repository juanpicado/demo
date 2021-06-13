import React, { useRef } from "react";
import { App } from "../../types/app";
import { Card } from "../molecule/Card";
import { useSlider } from "../lib/util/Slider";
import { ChevronLeft, ChevronRight, Icon } from "../lib/util/Icon";
import { classes } from "../lib/util/Classes";

interface SliderProps {
    title?: string;
    items: App.Movie[];
}

export const Slider: React.FC<SliderProps> = ({ items, title }) => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const { next, prev, active } = useSlider(sliderRef, {
        slidesPerView: 6,
        spacing: 15,
        rubberband: false,
    });

    const sliderClasses = classes({
        slider: true,
        "has-prev": active > 0,
    });

    return (
        <div className={sliderClasses}>
            {title && <div className="slider-headline">{title}</div>}
            <div className="slider-overlay" />
            <div className="slider-frame">
                <button type="button" className="slider-prev-container" onClick={prev}>
                    <Icon name="chevron-left" icon={ChevronLeft} />
                </button>
                <button type="button" className="slider-next-container" onClick={next}>
                    <Icon name="chevron-right" icon={ChevronRight} />
                </button>
                <div className="slider-inner">
                    <div className="slider-container keen-slider" ref={sliderRef}>
                        {items.map((item, index) => (
                            <div
                                className="slider-slide keen-slider__slide"
                                key={item.original_title + index}>
                                <Card {...item} />
                            </div>
                        ))}
                        <div className="slider-drag-info">Drag me here</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
