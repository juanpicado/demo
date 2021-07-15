import React from "react";
import { BlockOpener } from "../molecule/BlockOpener";
import { BlockSlider } from "../organism/BlockSlider";
import { BlockGenre } from "../organism/BlockGenre";
import { App } from "../../../types/app";
import { Api } from "../../../types/api";
import { useInfiniteScroll } from "../../lib/util/infinite-scroll";
import { useWatchlist } from "../../context/Watchlist/WatchlistProvider";

export interface IndexProps {
    opener: App.ItemDetails;
    daily: App.Item[];
    genres: Record<string, Api.Genre>;
}

export const IndexTemplate: React.FC<IndexProps> = ({ opener, genres, daily }) => {
    // const { page } = useInfiniteScroll({ initialPage: 6, limit: Object.keys(genres).length });
    const { bookmarkItems, progressItems, hasBookmark, toggleWatchlistItem } = useWatchlist();

    return (
        <React.Fragment>
            <BlockOpener
                {...opener}
                hasBookmark={hasBookmark(opener.id)}
                toggleWatchlistItem={toggleWatchlistItem}
            />
            {progressItems.length > 0 && (
                <div className="__block">
                    <BlockSlider title="Keep watching" items={progressItems} />
                </div>
            )}
            {bookmarkItems.length > 0 && (
                <div className="__block">
                    <BlockSlider title="Your watchlist" items={bookmarkItems} />
                </div>
            )}
            <div className="__block">
                <BlockSlider title="Popular Today" items={daily} slides={4} />
            </div>
            <div>
                {Object.keys(genres)
                    .slice(0, 4)
                    .map(genreKey => (
                        <div key={genreKey} className="__block">
                            <BlockGenre {...genres[genreKey]} />
                        </div>
                    ))}
            </div>
        </React.Fragment>
    );
};
