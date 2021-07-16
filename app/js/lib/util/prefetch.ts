import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { preloadItem } from "../redux/reducer/items";
import { MediaTypes } from "./media-types";

interface PrefetchData {
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

/**
 * A custom React hook to prefetch data on hover.
 *
 * @param {number} id - The item's id.
 * @param {MediaTypes} type - The item's media type.
 * @returns {PrefetchData} An object containing functions to trigger data fetching.
 */
export const usePrefetch = (id: number, type: MediaTypes): PrefetchData => {
    const router = useRouter();
    const dispatch = useDispatch();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onClick = () => {
        router.push({ query: { ...router.query, id: id, media: type } }, undefined, {
            shallow: true,
        });
    };

    const onMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            dispatch(preloadItem({ id, type }));
        }, 400);
    };

    const onMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    return {
        onClick,
        onMouseEnter,
        onMouseLeave,
    };
};
