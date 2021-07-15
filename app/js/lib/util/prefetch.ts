import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { preloadItem } from "../redux/reducer/items";
import { MediaTypes } from "./media-types";

export const usePrefetch = (id: number, type: MediaTypes) => {
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
        }, 300);
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