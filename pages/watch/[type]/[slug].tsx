import React from "react";
import { GetServerSideProps } from "next";
import { Player } from "../../../app/js/organism/Player";
import { App } from "../../../app/types/app";
import { getServerSideItem } from "../../../app/js/lib/api/server";
import { PlayerProvider } from "../../../app/js/context/Player/PlayerProvider";
import { cutText } from "../../../app/js/lib/util/Text";
import { generateImageUrl } from "../../../app/js/lib/util/Urls";
import { Meta } from "../../../app/js/lib/util/Meta";

interface WatchProps {
    item: App.ItemDetails;
}

const Watch: React.FC<WatchProps> = ({ item }) => {
    return (
        <PlayerProvider>
            <Meta
                title={item.title + " - Streamio"}
                desc={cutText(item.text)}
                image={item.backdrop ? generateImageUrl(item.backdrop) : undefined}
            />
            <Player />
        </PlayerProvider>
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
