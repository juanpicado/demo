import { useState, useEffect, useRef, MutableRefObject } from "react";
import KeenSlider, { TOptionsEvents } from "keen-slider";

interface SliderData {
    isBeginning: boolean;
    isEnd: boolean;
    mounted: boolean;
    active: number;
    next: () => void;
    prev: () => void;
}

/**
 * A custom React hook to mount a slider on a given element.
 *
 * @param ref - The HTMLElement the slider will be mounted on.
 * @param options - Additional options regarding keen slider.
 * @param dependencies - Dependencies that, when changed from the previous render, will remount the slider.
 * @returns {SliderData} An object containing multiple variables and functions.
 */
export function useSlider(
    ref: MutableRefObject<HTMLElement | null>,
    options?: TOptionsEvents,
    dependencies: any[] = []
): SliderData {
    const sliderRef = useRef<KeenSlider | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    const [active, setActive] = useState<number>(0);
    const [isBeginning, setIsBeginning] = useState<boolean>(!options?.loop);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        sliderRef.current = new KeenSlider(ref.current, {
            ...options,
            spacing: 15,
            rubberband: false,
            autoAdjustSlidesPerView: false,
            breakpoints: {
                "(max-width: 1024px)": {
                    slidesPerView: 4,
                },
                "(max-width: 768px)": {
                    spacing: 10,
                    slidesPerView: 3,
                },
                "(max-width: 425px)": {
                    slidesPerView: 2,
                },
            },
            mounted: () => setMounted(true),
            slideChanged: ref => {
                const slide = ref.details().relativeSlide;
                setActive(slide);
                setIsBeginning(!ref.options().loop && ref.details().relativeSlide === 0);
                setIsEnd(
                    !ref.options().loop &&
                        ref.details().relativeSlide ===
                            ref.details().size - ref.details().slidesPerView
                );
            },
        });

        return () => {
            sliderRef.current?.destroy();
            sliderRef.current = null;
        };
    }, [...dependencies]);

    return {
        isBeginning,
        isEnd,
        mounted,
        active,
        next: () => sliderRef.current?.next(),
        prev: () => sliderRef.current?.prev(),
    };
}
