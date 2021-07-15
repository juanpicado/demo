import React, { useMemo } from "react";
import { BlockOpener } from "../molecule/BlockOpener";
import { BlockSlider } from "../organism/BlockSlider";
import { BlockGenre } from "../organism/BlockGenre";
import { App } from "../../../types/app";
import { Api } from "../../../types/api";
import { useInfiniteScroll } from "../../lib/util/infinite-scroll";
import { useWatchlist } from "../../context/Watchlist/WatchlistProvider";
import { MediaTypes } from "../../lib/util/media-types";

export interface IndexProps {
    opener: App.ItemDetails;
    daily: App.Item[];
    genres: Record<string, Api.Genre>;
    type?: MediaTypes;
}

export const IndexTemplate: React.FC<IndexProps> = ({ opener, genres, daily, type }) => {
    const { page } = useInfiniteScroll({
        initialPage: 6,
        limit: Math.min(Object.keys(genres).length, 19),
    });
    const { bookmarkItems, progressItems, hasBookmark, toggleWatchlistItem } = useWatchlist();

    const keepWatching = useMemo(() => {
        if (type) {
            return progressItems.filter(item => item.media_type === type);
        } else {
            return progressItems;
        }
    }, [progressItems, type]);

    const bookmarks = useMemo(() => {
        if (type) {
            return bookmarkItems.filter(item => item.media_type === type);
        } else {
            return bookmarkItems;
        }
    }, [bookmarkItems, type]);

    return (
        <React.Fragment>
            <BlockOpener
                {...opener}
                hasBookmark={hasBookmark(opener.id)}
                toggleWatchlistItem={toggleWatchlistItem}
            />
            {keepWatching.length > 0 && (
                <div className="__block">
                    <BlockSlider title="Keep watching" items={keepWatching} />
                </div>
            )}
            {bookmarks.length > 0 && (
                <div className="__block">
                    <BlockSlider title="Your watchlist" items={bookmarks} />
                </div>
            )}
            <div className="__block">
                <BlockSlider title="Popular Today" items={daily} slides={4} />
            </div>
            <div>
                {Object.keys(genres)
                    .slice(0, page)
                    .map(genreKey => (
                        <div key={genreKey} className="__block">
                            <BlockGenre {...genres[genreKey]} />
                        </div>
                    ))}
            </div>
        </React.Fragment>
    );
};
