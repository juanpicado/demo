import React from "react";
import Image from "next/image";
import { App } from "../../../types/app";
import { generateImageUrl } from "../../lib/util/url";
import { usePrefetch } from "../../lib/util/prefetch";

export const SearchCard: React.FC<App.Item> = ({ poster, title, id, media_type }) => {
    const { onClick, onMouseEnter, onMouseLeave } = usePrefetch(id, media_type);

    if (!poster) return null;

    return (
        <button
            type="button"
            className="search-card"
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <div className="search-card-image-wrapper">
                <Image src={generateImageUrl(poster)} alt={title} layout="fill" objectFit="cover" />
            </div>
        </button>
    );
};
