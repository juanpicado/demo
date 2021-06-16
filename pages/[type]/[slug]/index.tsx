import React from "react";
import { GetServerSideProps } from "next";
import { getServerSideItem } from "../../../app/js/lib/api/server";
import { BlockOpener } from "../../../app/js/molecule/BlockOpener";
import { App } from "../../../app/types/app";
import { getItemsByGenre } from "../../../app/js/lib/api/backend";
import { Api } from "../../../app/types/api";
import { BlockSlider } from "../../../app/js/organism/BlockSlider";
import { BlockSeasons } from "../../../app/js/organism/BlockSeasons";

interface ItemProps {
    item: App.ItemDetails;
    recommendations: Api.Item[];
}

const Item: React.FC<ItemProps> = ({ item, recommendations }) => {
    if (!item) return null;

    return (
        <React.Fragment>
            <BlockOpener {...item} isDetailsPage />
            {item.seasons && (
                <div className="block">
                    <BlockSeasons seasons={item.seasons} tvId={item.id} />
                </div>
            )}
            {recommendations && (
                <div className="block">
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

    return {
        props: {
            item,
            recommendations: recommendations.filter(
                recommendation => recommendation.id !== item.id
            ),
        },
    };
};

export default Item;
