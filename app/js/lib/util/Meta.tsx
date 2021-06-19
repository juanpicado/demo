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

            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
    );
};
