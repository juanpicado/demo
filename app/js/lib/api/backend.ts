import { Api } from "../../../types/api";
import { MOVIE_KEY, TV_KEY } from "../util/MediaTypes";

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

export const getTrending = async (
    time: string,
    type: string
): Promise<Api.Page<Api.TrendingItem[]>> => {
    return await db<Api.Page<Api.TrendingItem[]>>(`/trending/${type}/${time}`);
};

const getMovieById = async (id: number | string): Promise<Api.MovieDetails> => {
    const item = await db<Api.MovieDetails>(`/movie/${id}`);
    return { ...item, media_type: MOVIE_KEY };
};

const getTvById = async (id: number | string): Promise<Api.TVDetails> => {
    const item = await db<Promise<Api.TVDetails>>(`/tv/${id}`);
    return { ...item, media_type: TV_KEY };
};

export const getItemById = async (id: number | string, type: string): Promise<Api.ItemDetails> => {
    switch (type) {
        case MOVIE_KEY:
            return getMovieById(id);
        case TV_KEY:
            return getTvById(id);
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

export const getItemsByGenre = async (id: number | string, type: string): Promise<Api.Item[]> => {
    switch (type) {
        case MOVIE_KEY:
            return getMovieByGenre(id);
        case TV_KEY:
            return getTvByGenre(id);
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
