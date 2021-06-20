import React, { createContext, useContext, useEffect, useState } from "react";
import { App } from "../../../types/app";
import { demoDuration } from "../../atom/CardProgress";

interface WatchlistItem {
    id: number;
    item: App.Item | App.ItemDetails;
    bookmark: boolean;
    progress: number;
}

type WatchlistRecord = Record<number, WatchlistItem>;

interface WatchlistContextData {
    watchlist: WatchlistRecord;
    toggleWatchlistItem: (item: App.Item | App.ItemDetails) => void;
    updateProgress: (item: App.Item | App.ItemDetails, progress: number) => void;
    hasBookmark: (id: number) => boolean;
    hasProgress: (id: number) => number;
    getBookmarkItems: () => (App.Item | App.ItemDetails)[];
    getProgressItems: () => (App.Item | App.ItemDetails)[];
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

    const updateWatchlistItem = (id: number, field: string, value: any) => {
        setWatchlist(prevState => {
            return {
                ...prevState,
                [id]: {
                    ...prevState[id],
                    [field]: value,
                },
            };
        });
    };

    const toggleWatchlistItem = (item: App.Item | App.ItemDetails) => {
        if (watchlist[item.id]) {
            updateWatchlistItem(item.id, "bookmark", !watchlist[item.id].bookmark);
            return;
        }

        setWatchlist(prevState => {
            return {
                ...prevState,
                [item.id]: {
                    id: item.id,
                    item,
                    progress: 0,
                    bookmark: prevState[item.id] ? !prevState[item.id].bookmark : true,
                },
            };
        });
    };

    const updateProgress = (item: App.Item | App.ItemDetails, progress: number) => {
        if (watchlist[item.id]) {
            updateWatchlistItem(item.id, "progress", progress > demoDuration * 0.95 ? 0 : progress);
            return;
        }

        setWatchlist(prevState => {
            return {
                ...prevState,
                [item.id]: {
                    id: item.id,
                    item,
                    bookmark: false,
                    progress,
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

    const hasProgress = (id: number): number => {
        const item = watchlist[id];

        if (!item) {
            return 0;
        }

        return item.progress;
    };

    const getBookmarkItems = (): (App.Item | App.ItemDetails)[] => {
        if (Object.keys(watchlist).length === 0) {
            return [];
        }

        return Object.keys(watchlist)
            .filter(key => watchlist[Number(key)].bookmark)
            .map(key => watchlist[Number(key)].item);
    };

    const getProgressItems = (): (App.Item | App.ItemDetails)[] => {
        if (Object.keys(watchlist).length === 0) {
            return [];
        }

        return Object.keys(watchlist)
            .filter(key => watchlist[Number(key)].progress !== 0)
            .map(key => watchlist[Number(key)].item);
    };

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                toggleWatchlistItem,
                updateProgress,
                hasBookmark,
                hasProgress,
                getBookmarkItems,
                getProgressItems,
            }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);
