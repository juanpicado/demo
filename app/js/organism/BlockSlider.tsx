import React, { useRef } from "react";
import { App } from "../../types/app";
import { Card } from "../molecule/Card";
import { useSlider } from "../lib/util/Slider";
import { ChevronLeft, ChevronRight, Icon } from "../lib/util/Icon";
import { classes } from "../lib/util/Classes";
import { useRouter } from "next/router";
import { mediaTypes } from "../lib/util/MediaTypes";
import { SliderControls } from "../atom/SliderControls";

interface SliderProps {
    items: (App.Item | App.ItemDetails)[];
    title?: string;
    slides?: number;
    mediaType?: string;
}

export const BlockSlider: React.FC<SliderProps> = ({ items, title, mediaType, slides = 6 }) => {
    const router = useRouter();
    const { type } = router.query;
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const { mounted, next, prev, isBeginning, isEnd } = useSlider(
        sliderRef,
        {
            spacing: 15,
            rubberband: false,
            slidesPerView: slides,
            autoAdjustSlidesPerView: false,
            breakpoints: {
                "(max-width: 768px)": {
                    spacing: 10,
                    slidesPerView: 2,
                },
            },
        },
        [items]
    );

    return (
        <div
            className={classes({
                "block-slider": true,
                "is-mounted": mounted,
                "has-prev": !isBeginning,
                "has-next": !isEnd,
            })}>
            <div className="block-slider-head">
                <div className="block-slider-head-group">
                    {title && <div className="block-slider-headline">{title}</div>}
                    {!type && mediaType && (
                        <div className="block-slider-type">{mediaTypes[mediaType]}</div>
                    )}
                </div>
                <SliderControls
                    onPrev={prev}
                    onNext={next}
                    isBeginning={isBeginning}
                    isEnd={isEnd}
                />
            </div>
            <div className="block-slider-frame">
                <button type="button" className="block-slider-prev-container" onClick={prev}>
                    <Icon name="chevron-left" icon={ChevronLeft} />
                </button>
                <button type="button" className="block-slider-next-container" onClick={next}>
                    <Icon name="chevron-right" icon={ChevronRight} />
                </button>
                <div className="block-slider-container keen-slider" ref={sliderRef}>
                    {items.map((item, index) => (
                        <div
                            className="block-slider-slide keen-slider__slide"
                            key={item.title + index}>
                            <Card {...item} imageSize={slides < 6 ? "original" : undefined} />
                        </div>
                    ))}
                    {mounted && <div className="block-slider-drag-info">Drag me here</div>}
                </div>
            </div>
        </div>
    );
};
