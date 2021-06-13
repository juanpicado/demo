import React from "react";
import Link from "next/link";
import { App } from "../../types/app";
import { generateImageUrl, generateItemUrl } from "../lib/util/Urls";
import { CardProgress } from "../atom/CardProgress";

interface CardProps extends App.Movie {
    imageSize?: string;
}

export const Card: React.FC<CardProps> = ({id, title, poster_path, imageSize}) => {

    if (!poster_path) return null;

    return (
        <Link href={generateItemUrl(title, id)}>
            <button type="button" className="card">
                <div className="card-inner">
                    <div className="card-image-wrapper">
                        <img
                            className="card-image"
                            src={generateImageUrl(poster_path, imageSize)}
                            alt={title}
                        />
                    </div>
                    <CardProgress />
                </div>
            </button>
        </Link>
    );
};
