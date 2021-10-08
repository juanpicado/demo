import React, { useEffect, useRef, useState, useMemo } from "react";
import debounce from "lodash/debounce";
import { SearchCard } from "../atom/SearchCard";
import { useSearch } from "../../lib/util/search";
import { App } from "../../../types/app";

interface SearchProps {
    type?: string;
}

export const Search: React.FC<SearchProps> = ({ type }) => {
    const { searchFetch } = useSearch(type);
    const [results, setResults] = useState<App.Item[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleSearch = (e: any) => {
        if ((e.target as HTMLInputElement).value) {
            fetchDebounce((e.target as HTMLInputElement).value);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async (search: string) => {
        try {
            const response = await searchFetch(search);
            setResults(response);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchDebounce = useMemo(() => debounce(fetchData, 200), [fetchData]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);

    return (
        <div className="search">
            <div className="search-inner">
                <input
                    ref={inputRef}
                    className="search-input"
                    type="text"
                    name="search"
                    placeholder="Whatup?"
                    onChange={handleSearch}
                />
                <div className="search-result-list">
                    <div className="search-result-list-frame">
                        <div className="search-result-list-inner">
                            {results.map((result, index) => (
                                <SearchCard key={result.id + index} {...result} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
