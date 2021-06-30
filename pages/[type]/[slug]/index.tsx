import React from "react";
import { GetServerSideProps } from "next";
import { getServerSideItem } from "../../../app/js/lib/api/server";
import { BlockOpener } from "../../../app/js/layout/molecule/BlockOpener";
import { App } from "../../../app/types/app";
import { getItemsByGenre, getSeasonById } from "../../../app/js/lib/api/backend";
import { BlockSlider } from "../../../app/js/layout/organism/BlockSlider";
import { BlockSeasons } from "../../../app/js/layout/organism/BlockSeasons";
import { Meta } from "../../../app/js/lib/util/Meta";
import { cutText } from "../../../app/js/lib/util/Text";
import { generateImageUrl } from "../../../app/js/lib/util/Urls";
import { useWatchlist } from "../../../app/js/context/Watchlist/WatchlistProvider";

interface ItemProps {
    item: App.ItemDetails;
    recommendations?: App.Item[];
    episodes?: App.Episode[];
}

const Item: React.FC<ItemProps> = ({ item, recommendations, episodes }) => {
    const { hasBookmark, toggleWatchlistItem } = useWatchlist();

    if (!item) return null;

    return (
        <React.Fragment>
            <Meta
                title={item.title + " - Streamio"}
                desc={cutText(item.text)}
                image={item.backdrop ? generateImageUrl(item.backdrop) : undefined}
            />
            <BlockOpener
                {...item}
                hasBookmark={hasBookmark(item.id)}
                toggleWatchlistItem={toggleWatchlistItem}
                isDetailsPage
            />
            {item.seasons && (
                <div className="__block">
                    <BlockSeasons
                        seasons={item.seasons}
                        tv_id={item.id}
                        initialEpisodes={episodes}
                    />
                </div>
            )}
            {recommendations && (
                <div className="__block">
                    <BlockSlider title="You could also like" items={recommendations} />
                </div>
            )}
        </React.Fragment>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const item = await getServerSideItem(ctx);

    if (!item) {
        return {
            notFound: true,
            props: {},
        };
    }

    if (item.genres.length === 0) {
        return {
            props: {
                item,
            },
        };
    }

    const genreId = item.genres[0].id;
    const recommendations = await getItemsByGenre(genreId, item.media_type);

    if (!item.seasons || item.seasons.length === 0) {
        return {
            props: {
                item,
                recommendations: recommendations.filter(
                    recommendation => recommendation.id !== item.id
                ),
            },
        };
    }

    const { episodes } = await getSeasonById(item.id, item.seasons[0].season_number);

    return {
        props: {
            item,
            episodes,
            recommendations: recommendations.filter(
                recommendation => recommendation.id !== item.id
            ),
        },
    };
};

export default Item;
