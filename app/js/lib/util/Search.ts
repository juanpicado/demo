import { useEffect, useState } from "react";
import { searchItemByGenre } from "../api/backend";
import { App } from "../../../types/app";
import { useRouter } from "next/router";

interface UseSearchData {
    results: App.Item[];
    search: string;
    setSearch: (value: string) => void;
}

export const useSearch = (): UseSearchData => {
    const router = useRouter();
    const { type } = router.query;
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<App.Item[]>([]);

    useEffect(() => {
        if (!search) {
            return;
        }

        searchByStr().catch(console.error);
    }, [search, type]);

    const searchByStr = async () => {
        if (type && "string" === typeof type) {
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
