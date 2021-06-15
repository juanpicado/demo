import { GetServerSidePropsContext } from "next";
import { Api } from "../../../types/api";
import { cutIdFromSlug } from "../util/Urls";
import { getItemById } from "./backend";
import { itemDetailsByMediaType } from "../util/MediaTypes";

export const getServerSideItem = async (ctx: GetServerSidePropsContext, props = {}) => {
    const slug = ctx.params?.slug;
    const type = ctx.params?.type;

    let item: Api.ItemDetails | null = null;

    if (!slug || "string" !== typeof slug || !type || "string" !== typeof type) {
        return {
            notFound: true,
            props: {},
        };
    }

    const id = cutIdFromSlug(slug);

    if (!id) {
        return {
            notFound: true,
            props: {},
        };
    }

    if (id) {
        item = await getItemById(id, type);
    }

    if (!item || item.success === false) {
        return {
            notFound: true,
            props: {},
        };
    }

    return {
        props: {
            ...props,
            item: itemDetailsByMediaType(item),
        },
    };
};
