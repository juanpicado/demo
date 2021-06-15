import React, { useRef } from "react";
import { Api } from "../../types/api";
import { Card } from "../molecule/Card";
import { useSlider } from "../lib/util/Slider";
import { ChevronLeft, ChevronRight, Icon } from "../lib/util/Icon";
import { classes } from "../lib/util/Classes";
import { useRouter } from "next/router";
import { mediaTypes } from "../lib/util/MediaTypes";
import { itemByMediaType } from "../lib/util/MediaTypes";

interface SliderProps {
    items: Api.Item[];
    title?: string;
    slides?: number;
    mediaType?: string;
}

export const BlockSlider: React.FC<SliderProps> = ({ items, title, mediaType, slides = 6 }) => {
    const router = useRouter();
    const { type } = router.query;
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const { mounted, next, prev, active } = useSlider(
        sliderRef,
        {
            slidesPerView: slides,
            spacing: 15,
            rubberband: false,
        },
        [items]
    );

    return (
        <div
            className={classes({
                "block-slider": true,
                "is-mounted": mounted,
                "has-prev": active > 0,
            })}>
            <div className="block-slider-head">
                {title && <div className="block-slider-headline">{title}</div>}
                {!type && mediaType && (
                    <div className="block-slider-type">{mediaTypes[mediaType]}</div>
                )}
            </div>
            <div className="block-slider-overlay" />
            <div className="block-slider-frame">
                <button type="button" className="block-slider-prev-container" onClick={prev}>
                    <Icon name="chevron-left" icon={ChevronLeft} />
                </button>
                <button type="button" className="block-slider-next-container" onClick={next}>
                    <Icon name="chevron-right" icon={ChevronRight} />
                </button>
                <div className="block-slider-container keen-slider" ref={sliderRef}>
                    {items.map((item, index) => {
                        const card = itemByMediaType(item);

                        return (
                            <div
                                className="block-slider-slide keen-slider__slide"
                                key={card.title + index}>
                                <Card {...card} imageSize={slides < 6 ? "original" : undefined} />
                            </div>
                        );
                    })}
                    {mounted && <div className="block-slider-drag-info">Drag me here</div>}
                </div>
            </div>
        </div>
    );
};
