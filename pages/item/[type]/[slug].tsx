import React from "react";
import { App } from "../../../app/types/app";
import { GetServerSideProps } from "next";
import { getMovieById } from "../../../app/js/lib/api/backend";
import { cutIdFromSlug } from "../../../app/js/lib/util/Urls";

interface ItemProps {
    item: App.Movie;
}

const Item: React.FC<ItemProps> = ({ item }) => {
    if (!item) return null;

    return <div>{item.title}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug;
    const type = params?.type;

    let item: App.Movie | null = null;

    if (!slug || "string" !== typeof slug) {
        return {
            notFound: true,
        };
    }

    const id = cutIdFromSlug(slug);

    if (!id) {
        return {
            notFound: true,
        };
    }

    if ("movie" === type && id) {
        item = await getMovieById(id);
    }

    if (!item || item.success === false) {
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
