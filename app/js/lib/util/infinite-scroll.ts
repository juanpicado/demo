import { useEffect, useState } from "react";

interface InfiniteScrollOptions {
    initialPage?: number;
    limit?: number;
}

interface UseInfiniteScrollData {
    page: number;
}

export const useInfiniteScroll = (options: InfiniteScrollOptions): UseInfiniteScrollData => {
    const [page, setPage] = useState<number>(options.initialPage || 0);

    useEffect(() => {
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5 && !hasReachedLimit()) {
                setPage(prevState => prevState + 1);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        // bad boy 👿, this should be commented out
        return () => window.removeEventListener("scroll", onScroll);
    }, [page]);

    const hasReachedLimit = () => {
        if (!options.limit) {
            return false;
        }

        return page >= options.limit;
    };

    return {
        page,
    };
};
