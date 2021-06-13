import React from "react";
import { BlockOpener } from "../molecule/BlockOpener";
import { BlockSlider } from "../organism/BlockSlider";
import { Api } from "../../types/api";
import { itemDetailsByMediaType } from "../lib/util/MediaTypes";
import { BlockGenre } from "../organism/BlockGenre";

export interface IndexProps {
    opener: Api.ItemDetails;
    daily: Api.Item[];
    genres: Record<string, Api.Genre>;
}

export const IndexTemplate: React.FC<IndexProps> = ({ daily, genres, opener }) => {
    const openerItem = itemDetailsByMediaType(opener);

    return (
        <React.Fragment>
            <BlockOpener {...openerItem} />
            <div className="block">
                <BlockSlider title="Popular Today" items={daily} slides={4} />
            </div>
            <div>
                {Object.keys(genres)
                    .slice(0, 6)
                    .map(genreKey => (
                        <div key={genreKey} className="block">
                            <BlockGenre {...genres[genreKey]} />
                        </div>
                    ))}
            </div>
        </React.Fragment>
    );
};
