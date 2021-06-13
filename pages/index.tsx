import React, { useRef } from "react";
import { GetStaticProps } from "next";
import { getMovieById, getMovieGenres, getTrending } from "../app/js/lib/api/backend";
import { App } from "../app/types/app";
import { Slider } from "../app/js/organism/Slider";
import { Opener } from "../app/js/molecule/Opener";
import { Genre } from "../app/js/organism/Genre";
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
            <Opener {...opener} />
            <Slider title="Popular Today" items={daily} />
            <div ref={containerRef}>
                {Object.keys(genres)
                    .slice(0, page)
                    .map(genreKey => (
                        <Genre key={genreKey} {...genres[genreKey]} />
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
