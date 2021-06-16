import { GetServerSidePropsContext } from "next";
import { Api } from "../../../types/api";
import { cutIdFromSlug } from "../util/Urls";
import { getItemById } from "./backend";
import { itemDetailsByMediaType } from "../util/MediaTypes";
import { App } from "../../../types/app";

export const getServerSideItem = async (
    ctx: GetServerSidePropsContext
): Promise<App.ItemDetails | null> => {
    const slug = ctx.params?.slug;
    const type = ctx.params?.type;

    let item: Api.ItemDetails | null = null;

    if (!slug || "string" !== typeof slug || !type || "string" !== typeof type) {
        return null;
    }

    const id = cutIdFromSlug(slug);

    if (!id) {
        return null;
    }

    if (id) {
        item = await getItemById(id, type);
    }

    if (!item || item.success === false) {
        return null;
    }

    return itemDetailsByMediaType(item);
};
