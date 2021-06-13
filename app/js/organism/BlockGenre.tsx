import React, { useEffect, useState } from "react";
import { App } from "../../types/app";
import { BlockSlider } from "./BlockSlider";
import { getMoviesByGenre } from "../lib/api/backend";

export const BlockGenre: React.FC<App.Genre> = ({ id, name }) => {
    const [movies, setMovies] = useState<App.Movie[] | null>(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const movies = await getMoviesByGenre(id);
        setMovies(movies.results);
    };

    if (!movies) return null;

    return <BlockSlider title={name} items={movies} />;
};
