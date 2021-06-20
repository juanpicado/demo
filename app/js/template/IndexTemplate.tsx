import React from "react";
import { BlockOpener } from "../molecule/BlockOpener";
import { BlockSlider } from "../organism/BlockSlider";
import { BlockGenre } from "../organism/BlockGenre";
import { App } from "../../types/app";
import { Api } from "../../types/api";
import { useInfiniteScroll } from "../lib/util/InfiniteScroll";

export interface IndexProps {
    opener: App.ItemDetails;
    daily: Api.Item[];
    genres: Record<string, Api.Genre>;
}

export const IndexTemplate: React.FC<IndexProps> = ({ opener, genres, daily }) => {
    const { page } = useInfiniteScroll({ initialPage: 6, limit: Object.keys(genres).length });

    return (
        <React.Fragment>
            <BlockOpener {...opener} />
            <div className="__block">
                <BlockSlider title="Popular Today" items={daily} slides={4} />
            </div>
            <div>
                {Object.keys(genres)
                    .slice(0, page)
                    .map(genreKey => (
                        <div key={genreKey} className="__block">
                            <BlockGenre {...genres[genreKey]} />
                        </div>
                    ))}
            </div>
        </React.Fragment>
    );
};
