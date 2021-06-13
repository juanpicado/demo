import React from "react";
import { App } from "../../types/app";

interface GenreListProps {
    genres: App.Genre[];
}

export const GenreList: React.FC<GenreListProps> = ({ genres }) => (
    <span className="genre-list">
        {genres.map((genre, index) => (
            <span key={"genre-" + genre.id}>
                {index > 0 ? ", " : ""}
                {genre.name}
            </span>
        ))}
    </span>
);
