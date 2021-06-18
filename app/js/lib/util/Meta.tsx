import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface MetaProps {
    title?: string;
    desc?: string;
    image?: string;
}

export const Meta: React.FC<MetaProps> = ({
    title = "Streamio - New Content, Everyday!",
    desc = "Your streaming service in terms of good quality, good content and good user experience!",
    image,
}) => {
    const router = useRouter();
    const metaImage = image ? image : process.env.NEXT_PUBLIC_BASE_URL + "/meta-preview.jpg";

    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={desc} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL + router.asPath} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:image" content={metaImage} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta
                property="twitter:url"
                content={process.env.NEXT_PUBLIC_BASE_URL + router.asPath}
            />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={desc} />
            <meta property="twitter:image" content={metaImage} />
        </Head>
    );
};
