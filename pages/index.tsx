import React from "react";
import { GetStaticProps } from "next";
import { getItemById, getGenres, getTrending } from "../app/js/lib/api/backend";
import { MOVIE_KEY, TV_KEY } from "../app/js/lib/util/media-types";
import { Meta } from "../app/js/lib/util/Meta";
import { IndexProps, IndexTemplate } from "../app/js/layout/template/IndexTemplate";

const Home: React.FC<IndexProps> = props => {
    return (
        <React.Fragment>
            <Meta />
            <IndexTemplate {...props} />
        </React.Fragment>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const daily = await getTrending("day", "all");
    const opener = await getItemById(daily[0].id, daily[0].media_type);
    const genres = await getGenres([MOVIE_KEY, TV_KEY]);

    return {
        props: {
            daily,
            opener,
            genres,
        },
        revalidate: 60 * 60,
    };
};

export default Home;
