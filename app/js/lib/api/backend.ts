import { Api } from "../../../types/api";
import {
    itemDetailsByMediaType,
    itemsByMediaType,
    itemsDetailsByMediaType,
    MediaTypes,
    MOVIE_KEY,
    TV_KEY,
} from "../util/media-types";
import { App } from "../../../types/app";

const baseUrl = process.env.NEXT_PUBLIC_THE_MOVIE_DB_V3_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_THE_MOVIE_DB_V3_API_KEY;

const db = <T>(endpoint: string, params = ""): Promise<T> => {
    return fetch(`${baseUrl}${endpoint}?api_key=${apiKey}${params}`)
        .then(res => res.json())
        .catch(console.error);
};

export const getGenres = async (types: string[]): Promise<Record<string, Api.Genre>> => {
    let allGenres: Api.Genre[] = [];
    await Promise.all(
        types.map(async type => {
            const { genres } = await db<Api.GenreList>(`/genre/${type}/list`);
            allGenres = [
                ...allGenres,
                ...genres.map(genre => {
                    return {
                        ...genre,
                        media_type: type,
                    };
                }),
            ];
        })
    );

    allGenres.sort((a, b) => a.name.localeCompare(b.name));

    return allGenres.reduce((map, item) => {
        map[`${item.id}-${item.media_type}`] = item;
        return map;
    }, {} as Record<string, Api.Genre>);
};

export const getTrending = async (time: string, type: string): Promise<App.Item[]> => {
    const { results } = await db<Api.Page<Api.Item[]>>(`/trending/${type}/${time}`);
    return itemsByMediaType(results);
};

const getMovieById = async (id: number | string): Promise<Api.MovieDetails> => {
    const item = await db<Api.MovieDetails>(`/movie/${id}`);
    return { ...item, media_type: MOVIE_KEY };
};

const getTvById = async (id: number | string): Promise<Api.TVDetails> => {
    const item = await db<Promise<Api.TVDetails>>(`/tv/${id}`);
    return { ...item, media_type: TV_KEY };
};

export const getItemById = async (id: number | string, type: string): Promise<App.ItemDetails> => {
    switch (type) {
        case MOVIE_KEY: {
            const items = await getMovieById(id);
            return itemDetailsByMediaType(items);
        }
        case TV_KEY: {
            const items = await getTvById(id);
            return itemDetailsByMediaType(items);
        }
        default:
            throw new Error("Unspecified media type");
    }
};

const getMovieByGenre = async (genreId: number | string): Promise<Api.Movie[]> => {
    const { results } = await db<Api.Page<Api.Movie[]>>(
        "/discover/movie",
        `&with_genres=${genreId}`
    );

    return results.map(result => {
        return {
            ...result,
            media_type: MOVIE_KEY,
        };
    });
};

const getTvByGenre = async (genreId: number | string): Promise<Api.TV[]> => {
    const { results } = await db<Api.Page<Api.TV[]>>("/discover/tv", `&with_genres=${genreId}`);

    return results.map(result => {
        return {
            ...result,
            media_type: TV_KEY,
        };
    });
};

export const getItemsByGenre = async (id: number | string, type: string): Promise<App.Item[]> => {
    switch (type) {
        case MOVIE_KEY: {
            const items = await getMovieByGenre(id);
            return itemsByMediaType(items);
        }
        case TV_KEY: {
            const items = await getTvByGenre(id);
            return itemsByMediaType(items);
        }
        default:
            throw new Error("Unspecified media type");
    }
};

export const getSeasonById = async (
    tvId: number | string,
    seasonId: number | string
): Promise<Api.SeasonDetails> => {
    return await db<Api.SeasonDetails>(`/tv/${tvId}/season/${seasonId}`);
};

const searchMovie = async (query: string): Promise<Api.Movie[]> => {
    const { results } = await db<Api.Page<Api.Movie[]>>(`/search/movie`, `&query=${query}`);

    return results.map(result => {
        return {
            ...result,
            media_type: MOVIE_KEY,
        };
    });
};

const searchTV = async (query: string): Promise<Api.TV[]> => {
    const { results } = await db<Api.Page<Api.TV[]>>(`/search/tv`, `&query=${query}`);

    return results.map(result => {
        return {
            ...result,
            media_type: TV_KEY,
        };
    });
};

export const searchItemByGenre = async (query: string, type: string): Promise<App.Item[]> => {
    switch (type) {
        case MOVIE_KEY: {
            const items = await searchMovie(query);
            return itemsByMediaType(items);
        }
        case TV_KEY: {
            const items = await searchTV(query);
            return itemsByMediaType(items);
        }
        default:
            throw new Error("Unspecified media type");
    }
};

const getTvRecommendations = async (id: number): Promise<Api.TV[]> => {
    const { results } = await db<Api.Page<Api.TV[]>>(`/tv/${id}/recommendations`);

    return results.map(result => {
        return {
            ...result,
            media_type: TV_KEY,
        };
    });
};

const getMovieRecommendations = async (id: number): Promise<Api.Movie[]> => {
    const { results } = await db<Api.Page<Api.Movie[]>>(`/movie/${id}/similar`);

    return results.map(result => {
        return {
            ...result,
            media_type: MOVIE_KEY,
        };
    });
};

export const getRecommendations = async (id: number, type: MediaTypes) => {
    switch (type) {
        case MOVIE_KEY: {
            const items = await getMovieRecommendations(id);
            return itemsByMediaType(items);
        }
        case TV_KEY: {
            const items = await getTvRecommendations(id);
            return itemsByMediaType(items);
        }
        default:
            throw new Error("Unspecified media type");
    }
};
