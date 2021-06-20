import React from "react";
import { GetStaticProps } from "next";
import { getItemById, getGenres, getTrending } from "../../app/js/lib/api/backend";
import { itemDetailsByMediaType, MOVIE_KEY, TV_KEY } from "../../app/js/lib/util/MediaTypes";
import { Meta } from "../../app/js/lib/util/Meta";
import { IndexProps, IndexTemplate } from "../../app/js/template/IndexTemplate";

const Type: React.FC<IndexProps> = props => {
    return (
        <React.Fragment>
            <Meta />
            <IndexTemplate {...props} />
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
