import React from "react";
import { GetStaticProps } from "next";
import { getItemById, getGenres, getTrending } from "../app/js/lib/api/backend";
import { itemDetailsByMediaType, MOVIE_KEY, TV_KEY } from "../app/js/lib/util/MediaTypes";
import { Meta } from "../app/js/lib/util/Meta";
import { IndexProps, IndexTemplate } from "../app/js/template/IndexTemplate";

const Home: React.FC<IndexProps> = props => {
    return (
        <React.Fragment>
            <Meta />
            <IndexTemplate {...props} />
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
