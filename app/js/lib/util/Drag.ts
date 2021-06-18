import { MutableRefObject, useEffect, useState } from "react";

interface UseDragData {
    drag: number | null;
    dragging: boolean;
}

export const useDrag = (
    containerRef: MutableRefObject<HTMLElement | null>,
    isTouch?: boolean
): UseDragData => {
    const [drag, setDrag] = useState<number | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        containerRef.current.addEventListener("click", onClick);
        containerRef.current.addEventListener("mousedown", startDrag);
        document.addEventListener("mouseup", cancelDrag);
        document.addEventListener("mouseleave", cancelDrag);
        document.addEventListener("mousemove", onMouseMove);
        containerRef.current.addEventListener("touchstart", startDrag);
        document.addEventListener("touchend", cancelDrag);
        document.addEventListener("touchmove", onTouchMove);

        return () => {
            containerRef.current?.removeEventListener("click", onClick);
            containerRef.current?.removeEventListener("mousedown", startDrag);
            document.removeEventListener("mouseup", cancelDrag);
            document.removeEventListener("mouseleave", cancelDrag);
            document.removeEventListener("mousemove", onMouseMove);
            containerRef.current?.removeEventListener("touchstart", startDrag);
            document.removeEventListener("touchend", cancelDrag);
            document.removeEventListener("touchmove", onTouchMove);
        };
    }, [dragging]);

    const startDrag = () => setDragging(true);

    const cancelDrag = () => setDragging(false);

    const onClick = (e: MouseEvent) => onProgress(e.clientX, e.clientY, true);

    const onMouseMove = (e: MouseEvent) => onProgress(e.clientX, e.clientY);

    const onTouchMove = (e: TouchEvent) => onProgress(e.touches[0].clientX, e.touches[0].clientY);

    const onProgress = (clientX: number, clientY: number, forceProgress = false) => {
        if (!dragging && !forceProgress) {
            return;
        }

        const container = containerRef.current;

        if (!container) {
            return;
        }

        const { width, height, left, bottom } = container.getBoundingClientRect();

        const x = isTouch ? (clientY - bottom) / height : (clientX - left) / width;
        setDrag(Math.abs(x));
    };

    return {
        drag,
        dragging,
    };
};
