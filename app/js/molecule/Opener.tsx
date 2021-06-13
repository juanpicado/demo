import React from "react";
import { App } from "../../types/app";
import { generateImageUrl } from "../lib/util/ImageUrl";
import { Button } from "../atom/Button";
import { cutText } from "../lib/util/Text";
import { GenreList } from "../atom/GenreList";
import { parseDate } from "../lib/util/Date";

export const Opener: React.FC<App.MovieDetails> = ({
    title,
    release_date,
    overview,
    backdrop_path,
    genres,
    runtime,
}) => {
    return (
        <div className="opener">
            <div className="opener-inner">
                <h1 className="opener-headline">{title}</h1>
                <div className="opener-info">
                    <span>{parseDate(release_date)}</span>
                    <span className="opener-info-separator" />
                    {runtime && (
                        <>
                            <span>{runtime} min</span>
                            <span className="opener-info-separator" />
                        </>
                    )}
                    <GenreList genres={genres} />
                </div>
                <div className="opener-text">{cutText(overview)}</div>
                <div className="opener-controls">
                    <Button onClick={() => null}>Play</Button>
                    <Button onClick={() => null} isSecondary>
                        More info
                    </Button>
                </div>
            </div>
            <div className="opener-background">
                <img
                    className="opener-background-image"
                    src={generateImageUrl(backdrop_path, "original")}
                    alt={title}
                />
            </div>
            <div className="opener-bottom-overlay" />
            <div className="opener-left-overlay" />
        </div>
    );
};
