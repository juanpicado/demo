import React, { useEffect, useState } from "react";
import { App } from "../../types/app";
import { Slider } from "./Slider";
import { getMoviesByGenre } from "../lib/api/backend";

export const Genre: React.FC<App.Genre> = ({ id, name }) => {
    const [movies, setMovies] = useState<App.Movie[]>(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const movies = await getMoviesByGenre(id);
        setMovies(movies.results);
    };

    if (!movies) return null;

    return <Slider title={name} items={movies} />;
};
