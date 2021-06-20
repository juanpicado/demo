import React from "react";
import { Meta } from "../../app/js/lib/util/Meta";
import { useWatchlist } from "../../app/js/context/Watchlist/WatchlistProvider";
import { BlockSlider } from "../../app/js/organism/BlockSlider";
import { WatchlistInfo } from "../../app/js/atom/WatchlistInfo";
import { GetStaticProps } from "next";
import { getTrending } from "../../app/js/lib/api/backend";
import { App } from "../../app/types/app";

interface WatchlistProps {
    daily: App.Item[];
}

const Watchlist: React.FC<WatchlistProps> = ({ daily }) => {
    const { getBookmarkItems, getProgressItems } = useWatchlist();

    return (
        <div className="__slot-watchlist">
            <Meta title="Watchlist - Streamio" />
            {getBookmarkItems().length === 0 ? (
                <WatchlistInfo />
            ) : (
                <div className="__block">
                    <BlockSlider title="Your bookmarks" items={getBookmarkItems()} slides={4} />
                </div>
            )}
            {getProgressItems().length > 0 && (
                <div className="__block">
                    <BlockSlider title="Keep watching" items={getProgressItems()} />
                </div>
            )}
            {daily && (
                <div className="__block">
                    <BlockSlider title="Popular today" items={daily} />
                </div>
            )}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const daily = await getTrending("day", "all");

    return {
        props: {
            daily,
        },
        revalidate: 60 * 60,
    };
};

export default Watchlist;
