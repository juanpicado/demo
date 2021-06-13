import React from "react";
import { App } from "../../types/app";
import { generateImageUrl, generateItemUrl } from "../lib/util/Urls";
import { Button } from "../atom/Button";
import { cutText } from "../lib/util/Text";
import { GenreList } from "../atom/GenreList";
import { parseDate } from "../lib/util/Date";

export const BlockOpener: React.FC<App.MovieDetails> = ({
    title,
    id,
    release_date,
    overview,
    backdrop_path,
    genres,
    runtime,
}) => {
    return (
        <div className="block-opener">
            <div className="block-opener-inner">
                <h1 className="block-opener-headline">{title}</h1>
                <div className="block-opener-info">
                    <span>{parseDate(release_date)}</span>
                    <span className="block-opener-info-separator" />
                    {runtime && (
                        <>
                            <span>{runtime} min</span>
                            <span className="block-opener-info-separator" />
                        </>
                    )}
                    <GenreList genres={genres} />
                </div>
                <div className="block-opener-text">{cutText(overview)}</div>
                <Button action={generateItemUrl(title, id)}>See more</Button>
            </div>
            {backdrop_path && (
                <div className="block-opener-background">
                    <img
                        className="block-opener-background-image"
                        src={generateImageUrl(backdrop_path, "original")}
                        alt={title}
                        loading="eager"
                    />
                </div>
            )}
            <div className="block-opener-bottom-overlay" />
            <div className="block-opener-left-overlay" />
        </div>
    );
};
