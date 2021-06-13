import { App } from "../../../types/app";

const db = <T>(endpoint: string, params = ""): Promise<T> => {
    return fetch(
        `${process.env.NEXT_PUBLIC_THE_MOVIE_DB_V3_BASE_URL}${endpoint}?api_key=${process.env.NEXT_PUBLIC_THE_MOVIE_DB_V3_API_KEY}${params}`
    )
        .then(res => res.json())
        .catch(console.error);
};

export const getMovieGenres = async (): Promise<Record<string, App.Genre>> => {
    const res = await db<App.GenreList>("/genre/movie/list");
    return res.genres.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {});
};

export const getTrending = async (time: "day" | "week"): Promise<App.Page<App.Movie[]>> => {
    return await db<Promise<App.Page<App.Movie[]>>>(`/trending/movie/${time}`);
};

export const getMovieById = async (id: number | string): Promise<App.Movie> => {
    return await db<Promise<App.Movie>>(`/movie/${id}`);
};

export const getMoviesByGenre = async (id: number | string): Promise<App.Page<App.Movie[]>> => {
    return await db<Promise<App.Page<App.Movie[]>>>("/discover/movie", `&with_genres=${id}`);
};
