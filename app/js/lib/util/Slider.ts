import { useState, useEffect, useRef, MutableRefObject } from "react";
import KeenSlider, { TOptionsEvents } from "keen-slider";

interface UseSliderData {
    active: number;
    next: () => void;
    prev: () => void;
}
export function useSlider(
    ref: MutableRefObject<HTMLDivElement | null>,
    options?: TOptionsEvents
): UseSliderData {
    const sliderRef = useRef<KeenSlider | null>(null);
    const [active, setActive] = useState<number>(0);

    useEffect(() => {
        if (!ref.current || sliderRef.current) {
            return;
        }

        sliderRef.current = new KeenSlider(ref.current, {
            ...options,
            slideChanged: ref => {
                const slide = ref.details().relativeSlide;
                setActive(slide);
            },
        });
    });

    return {
        active,
        next: () => sliderRef.current?.next(),
        prev: () => sliderRef.current?.prev(),
    };
}
