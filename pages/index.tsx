import React from "react";
import { GetStaticProps } from "next";
import { getItemById, getGenres, getTrending } from "../app/js/lib/api/backend";
import { itemDetailsByMediaType, MOVIE_KEY, TV_KEY } from "../app/js/lib/util/MediaTypes";
import { BlockOpener } from "../app/js/molecule/BlockOpener";
import { BlockSlider } from "../app/js/organism/BlockSlider";
import { BlockGenre } from "../app/js/organism/BlockGenre";
import { App } from "../app/types/app";
import { Api } from "../app/types/api";
import { Meta } from "../app/js/lib/util/Meta";

export interface IndexProps {
    opener: App.ItemDetails;
    daily: Api.Item[];
    genres: Record<string, Api.Genre>;
}

const Home: React.FC<IndexProps> = ({ daily, genres, opener }) => {
    return (
        <React.Fragment>
            <Meta />
            <BlockOpener {...opener} />
            <div className="__block">
                <BlockSlider title="Popular Today" items={daily} slides={4} />
            </div>
            <div>
                {Object.keys(genres)
                    .slice(0, 6)
                    .map(genreKey => (
                        <div key={genreKey} className="__block">
                            <BlockGenre {...genres[genreKey]} />
                        </div>
                    ))}
            </div>
        </React.Fragment>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { results } = await getTrending("day", "all");
    const opener = await getItemById(results[0].id, results[0].media_type);
    const genres = await getGenres([MOVIE_KEY, TV_KEY]);

    return {
        props: {
            opener: itemDetailsByMediaType(opener),
            genres: genres,
            daily: results,
        },
        revalidate: 60 * 60,
    };
};

export default Home;
