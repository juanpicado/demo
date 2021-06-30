import { useEffect, useState } from "react";
import { searchItemByGenre } from "../api/backend";
import { App } from "../../../types/app";

interface UseSearchData {
    results: App.Item[];
    search: string;
    setSearch: (value: string) => void;
}

export const useSearch = (type?: string): UseSearchData => {
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
            // Unfortunately the api does not allow to search for all media types at once
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
