import { useState, useEffect, useRef, MutableRefObject } from "react";
import KeenSlider, { TOptionsEvents } from "keen-slider";

interface UseSliderData {
    mounted: boolean;
    active: number;
    next: () => void;
    prev: () => void;
}
export function useSlider(
    ref: MutableRefObject<HTMLDivElement | null>,
    options?: TOptionsEvents,
    dependencies: any[] = []
): UseSliderData {
    const sliderRef = useRef<KeenSlider | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    const [active, setActive] = useState<number>(0);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        sliderRef.current = new KeenSlider(ref.current, {
            ...options,
            mounted: () => setMounted(true),
            slideChanged: ref => {
                const slide = ref.details().relativeSlide;
                setActive(slide);
            },
        });

        return () => {
            sliderRef.current?.destroy();
            sliderRef.current = null;
        };
    }, [...dependencies]);

    return {
        mounted,
        active,
        next: () => sliderRef.current?.next(),
        prev: () => sliderRef.current?.prev(),
    };
}
