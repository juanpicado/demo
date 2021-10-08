import { useEffect, useState } from "react";
import { searchItemByGenre } from "../api/backend";
import { App } from "../../../types/app";

interface SearchData {
    searchFetch: (value: string) => Promise<any>;
}

/**
 * A custom React hook to process a search string.
 *
 * @param {string} type - The media type the search will take place for.
 * @returns {SearchData} An object containing search results among other values and functions.
 */
export const useSearch = (type?: string): SearchData => {
    const searchFetch = async (search: string) => {
        if (type) {
            return await searchItemByGenre(search, type);
        } else {
            // The api does not allow to search for all media types at once
            const movie = await searchItemByGenre(search, "movie");
            const tv = await searchItemByGenre(search, "tv");
            return [...tv, ...movie];
        }
    };

    return {
        searchFetch,
    };
};
