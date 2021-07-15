import React from "react";
import Link from "next/link";
import Image from "next/image";
import { App } from "../../../types/app";
import { generateImageUrl, generateItemUrl } from "../../lib/util/url";

export const SearchCard: React.FC<App.Item> = ({ poster, title, id, media_type }) => {
    if (!poster) return null;

    return (
        <Link href={generateItemUrl(media_type, title, id)} passHref>
            <a className="search-card">
                <div className="search-card-image-wrapper">
                    <Image
                        src={generateImageUrl(poster)}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </a>
        </Link>
    );
};
