import React from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { App } from "../../../app/types/app";
import { getServerSideItem } from "../../../app/js/lib/api/server";
import { cutText } from "../../../app/js/lib/util/text";
import { generateImageUrl } from "../../../app/js/lib/util/url";
import { Meta } from "../../../app/js/lib/util/Meta";

const Player = dynamic<WatchProps>(
    () => import("../../../app/js/layout/player/Player").then(mod => mod.Player),
    { ssr: false }
);

interface WatchProps {
    item: App.ItemDetails;
}

const Watch: React.FC<WatchProps> = ({ item }) => {
    return (
        <>
            <Meta
                title={item.title + " - Streamio"}
                desc={cutText(item.text)}
                image={item.backdrop ? generateImageUrl(item.backdrop) : undefined}
            />
            <Player item={item} />
        </>
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

    return {
        props: {
            item,
            hideNav: true,
        },
    };
};

export default Watch;
