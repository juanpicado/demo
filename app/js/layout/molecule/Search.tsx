import React, { useEffect, useRef } from "react";
import { SearchCard } from "../atom/SearchCard";
import { useSearch } from "../../lib/util/search";

interface SearchProps {
    type?: string;
}

export const Search: React.FC<SearchProps> = ({ type }) => {
    const { search, setSearch, results } = useSearch(type);
    const inputRef = useRef<HTMLInputElement | null>(null);

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
                    value={search}
                    onInput={e => setSearch((e.target as HTMLInputElement).value)}
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
