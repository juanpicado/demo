import React from "react";
import Link from "next/link";
import { App } from "../../types/app";
import { generateImageUrl, generateItemUrl } from "../lib/util/Urls";
import { CardProgress } from "../atom/CardProgress";

export const Card: React.FC<App.Movie> = ({id, title, poster_path}) => {

    if (!poster_path) return null;

    return (
        <Link href={generateItemUrl(title, id)}>
            <button type="button" className="card">
                <div className="card-image-wrapper">
                    <img
                        className="card-image"
                        src={generateImageUrl(poster_path)}
                        alt={title}
                    />
                </div>
                <CardProgress />
            </button>
        </Link>
    );
};
