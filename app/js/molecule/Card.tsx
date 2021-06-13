import React from "react";
import Link from "next/link";
import { App } from "../../types/app";
import { generateImageUrl } from "../lib/util/ImageUrl";
import { CardProgress } from "../atom/CardProgress";

export const Card: React.FC<App.Movie> = props => {
    return (
        <Link href={`/item/movie/${props.id}`}>
            <button type="button" className="card">
                <div className="card-image-wrapper">
                    <img
                        className="card-image"
                        src={generateImageUrl(props.poster_path)}
                        alt={props.title}
                    />
                </div>
                <CardProgress />
            </button>
        </Link>
    );
};
