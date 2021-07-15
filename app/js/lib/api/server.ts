import { GetServerSidePropsContext } from "next";
import { cutIdFromSlug } from "../util/url";
import { getItemById } from "./backend";
import { App } from "../../../types/app";

export const getServerSideItem = async (
    ctx: GetServerSidePropsContext
): Promise<App.ItemDetails | null> => {
    const slug = ctx.params?.slug;
    const type = ctx.params?.type;

    let item: App.ItemDetails | null = null;

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

    if (!item || !item.id) {
        return null;
    }

    return item;
};
