import { useState, useEffect, useRef, MutableRefObject } from "react";
import KeenSlider, { TOptionsEvents } from "keen-slider";

interface UseSliderData {
    active: number;
    sliderRef: MutableRefObject<KeenSlider>;
    next: () => void;
    prev: () => void;
}
export function useSlider(
    ref: MutableRefObject<HTMLDivElement>,
    options?: TOptionsEvents
): UseSliderData {
    const sliderRef = useRef<KeenSlider>(null);
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
        sliderRef,
        next: () => sliderRef.current.next(),
        prev: () => sliderRef.current.prev(),
    };
}
