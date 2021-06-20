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
    const { bookmarkItems, progressItems } = useWatchlist();

    return (
        <div className="__slot-watchlist">
            <Meta title="Watchlist - Streamio" />
            {bookmarkItems.length === 0 ? (
                <WatchlistInfo />
            ) : (
                <div className="__block">
                    <BlockSlider title="Your bookmarks" items={bookmarkItems} slides={4} />
                </div>
            )}
            {progressItems.length > 0 && (
                <div className="__block">
                    <BlockSlider title="Keep watching" items={progressItems} />
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
