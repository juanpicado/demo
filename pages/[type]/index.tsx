import React from "react";
import { GetStaticProps } from "next";
import { getItemById, getGenres, getTrending } from "../../app/js/lib/api/backend";
import { IndexProps, IndexTemplate } from "../../app/js/template/IndexTemplate";
import { MOVIE_KEY, TV_KEY } from "../../app/js/lib/util/MediaTypes";

const Type: React.FC<IndexProps> = props => {
    return <IndexTemplate {...props} />;
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
            opener,
            genres,
            daily: results,
        },
    };
};

export default Type;
