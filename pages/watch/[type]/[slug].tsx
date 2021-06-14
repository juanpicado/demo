import React from "react";
import { GetServerSideProps } from "next";
import { Player } from "../../../app/js/organism/Player";
import { App } from "../../../app/types/app";
import { getServerSideItem } from "../../../app/js/lib/api/server";
import { PlayerProvider } from "../../../app/js/context/PlayerProvider";

interface WatchProps {
    item: App.ItemDetails;
}

const Watch: React.FC<WatchProps> = ({ item }) => {
    return (
        <PlayerProvider>
            <Player />
        </PlayerProvider>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    return getServerSideItem(ctx, { hideNav: true });
};

export default Watch;
