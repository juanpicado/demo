import React from "react";
import { GetStaticProps } from "next";
import { getItemById, getGenres, getTrending } from "../../app/js/lib/api/backend";
import { itemDetailsByMediaType, MOVIE_KEY, TV_KEY } from "../../app/js/lib/util/MediaTypes";
import { BlockOpener } from "../../app/js/molecule/BlockOpener";
import { BlockSlider } from "../../app/js/organism/BlockSlider";
import { BlockGenre } from "../../app/js/organism/BlockGenre";
import { IndexProps } from "../index";

const Type: React.FC<IndexProps> = ({ daily, genres, opener }) => {
    return (
        <React.Fragment>
            <BlockOpener {...opener} />
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

export async function getStaticPaths() {
    return {
        paths: [{ params: { type: MOVIE_KEY } }, { params: { type: TV_KEY } }],
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const type = params?.type;

    if (!type || "string" !== typeof type) {
        return {
            props: {},
        };
    }

    const { results } = await getTrending("day", type);
    const opener = await getItemById(results[0].id, type);
    const genres = await getGenres([type]);

    return {
        props: {
            opener: itemDetailsByMediaType(opener),
            genres,
            daily: results,
        },
    };
};

export default Type;
