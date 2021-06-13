import React, { useRef } from "react";
import { GetStaticProps } from "next";
import { getMovieById, getMovieGenres, getTrending } from "../app/js/lib/api/backend";
import { App } from "../app/types/app";
import { BlockSlider } from "../app/js/organism/BlockSlider";
import { BlockOpener } from "../app/js/molecule/BlockOpener";
import { BlockGenre } from "../app/js/organism/BlockGenre";
import { useInfiniteScroll } from "../app/js/lib/util/InfiniteScroll";

interface HomeProps {
    opener: App.MovieDetails;
    daily: App.Movie[];
    genres: Record<string, App.Genre>;
}

const Home: React.FC<HomeProps> = ({ daily, opener, genres }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { page } = useInfiniteScroll(containerRef, 2);

    return (
        <React.Fragment>
            <BlockOpener {...opener} />
            <div className="block">
                <BlockSlider title="Popular Today" items={daily} slides={4} />
            </div>
            <div ref={containerRef}>
                {Object.keys(genres)
                    .slice(0, page)
                    .map(genreKey => (
                        <div key={genreKey} className="block">
                            <BlockGenre {...genres[genreKey]} />
                        </div>
                    ))}
            </div>
        </React.Fragment>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const daily = await getTrending("day");
    const opener = await getMovieById(daily.results[0].id);
    const genres = await getMovieGenres();

    return {
        props: {
            opener,
            genres,
            daily: daily.results,
        },
    };
};

export default Home;
