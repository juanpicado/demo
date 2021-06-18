import React, { createContext, useContext, useEffect, useState } from "react";

interface WatchlistItem {
    id: number;
    bookmark: boolean;
    progress: number;
}

type WatchlistRecord = Record<number, WatchlistItem>;

interface WatchlistContextData {
    watchlist: WatchlistRecord;
    toggleWatchlistItem: (id: number) => void;
    hasBookmark: (id: number) => boolean;
    hasProgress: (id: number) => number | boolean;
}

const WatchlistContext = createContext<WatchlistContextData>({} as WatchlistContextData);

const CONTEXT_WATCHLIST = "streamio-watchlist";

export const WatchlistProvider: React.FC = ({ children }) => {
    const [watchlist, setWatchlist] = useState<WatchlistRecord>({});

    useEffect(() => {
        const json = localStorage.getItem(CONTEXT_WATCHLIST);

        if (json) {
            const items = JSON.parse(json);
            setWatchlist(items);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(CONTEXT_WATCHLIST, JSON.stringify(watchlist));
    }, [watchlist]);

    const toggleWatchlistItem = (id: number) => {
        setWatchlist(prevState => {
            return {
                ...prevState,
                [id]: {
                    id,
                    progress: 0,
                    bookmark: prevState[id] ? !prevState[id].bookmark : true,
                },
            };
        });
    };

    const hasBookmark = (id: number): boolean => {
        const item = watchlist[id];

        if (!item) {
            return false;
        }

        return item.bookmark;
    };

    const hasProgress = (id: number): number | boolean => {
        const item = watchlist[id];

        if (!item) {
            return false;
        }

        return item.progress;
    };

    return (
        <WatchlistContext.Provider
            value={{ watchlist, toggleWatchlistItem, hasBookmark, hasProgress }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);
