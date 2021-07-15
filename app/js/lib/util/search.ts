import { useEffect, useState } from "react";
import { searchItemByGenre } from "../api/backend";
import { App } from "../../../types/app";

interface SearchData {
    results: App.Item[];
    search: string;
    setSearch: (value: string) => void;
}

/**
 * A custom React hook to process a search string.
 *
 * @param {string} type - The media type the search will take place for.
 * @returns {SearchData} An object containing search results among other values and functions.
 */
export const useSearch = (type?: string): SearchData => {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<App.Item[]>([]);

    useEffect(() => {
        if (!search) {
            return;
        }

        searchByStr().catch(console.error);
    }, [search, type]);

    const searchByStr = async () => {
        if (type) {
            const res = await searchItemByGenre(search, type);
            setResults(res);
        } else {
            // The api does not allow to search for all media types at once
            const movie = await searchItemByGenre(search, "movie");
            const tv = await searchItemByGenre(search, "tv");
            setResults([...tv, ...movie]);
        }
    };

    return {
        results,
        search,
        setSearch,
    };
};
