import React from "react";
import { Api } from "../../app/types/api";
import { GetServerSideProps } from "next";
import { getItemById } from "../../app/js/lib/api/backend";
import { cutIdFromSlug } from "../../app/js/lib/util/Urls";

interface ItemProps {
    item: Api.Item;
}

const Item: React.FC<ItemProps> = ({ item }) => {
    if (!item) return null;

    return <div>hallo</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug;
    const type = params?.type;

    let item: Api.ItemDetails | null = null;

    if (!slug || "string" !== typeof slug || !type || "string" !== typeof type) {
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

    if (id) {
        item = await getItemById(id, type);
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
