import React from "react";
import { GetStaticProps } from "next";
import { getItemById, getGenres, getTrending } from "../app/js/lib/api/backend";
import { IndexProps, IndexTemplate } from "../app/js/template/IndexTemplate";
import { MOVIE_KEY, TV_KEY } from "../app/js/lib/util/MediaTypes";

const Home: React.FC<IndexProps> = props => {
    return <IndexTemplate {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
    const { results } = await getTrending("day", "all");
    const opener = await getItemById(results[0].id, results[0].media_type);
    const genres = await getGenres([MOVIE_KEY, TV_KEY]);

    return {
        props: {
            opener,
            genres: genres,
            daily: results,
        },
        revalidate: 60 * 60,
    };
};

export default Home;
