import React from "react";
import { App } from "../../../app/types/app";
import { GetServerSideProps } from "next";
import { getMovieById } from "../../../app/js/lib/api/backend";

interface ItemProps {
    item: App.Movie;
}

const Item: React.FC<ItemProps> = ({ item }) => {
    if (!item) return null;

    return <div>{item.title}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { type, id } = params;
    let item: App.Movie = null;

    if ("movie" === type && id) {
        item = await getMovieById(id as string);
    }

    if (!item) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            item,
        },
    };
};

export default Item;
