import { RefObject, useEffect, useState } from "react";
import debounce from "lodash/debounce";

interface UseInfiniteScrollData {
    page: number;
}

export const useInfiniteScroll = (
    ref: RefObject<HTMLDivElement>,
    initialPage = 0
): UseInfiniteScrollData => {
    const [page, setPage] = useState<number>(initialPage);

    useEffect(() => {
        const container = ref.current;

        if (!container) {
            return;
        }

        const onScroll = debounce(() => {
            if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
                setPage(prevState => prevState + 1);
            }
        }, 100);

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [page]);

    return {
        page,
    };
};
