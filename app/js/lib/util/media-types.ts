import { Api } from "../../../types/api";
import { generateSlug } from "./url";
import { parseDate } from "./date";
import { App } from "../../../types/app";

export const MOVIE_KEY = "movie";

export const TV_KEY = "tv";

export type MediaTypes = "movie" | "tv";

export const mediaTypes: Record<string, string> = {
    [MOVIE_KEY]: "Movies",
    [TV_KEY]: "TV",
};

export const itemByMediaType = (item: Api.Item): App.Item => {
    switch (item.media_type) {
        case MOVIE_KEY:
            return {
                id: item.id,
                title: item.title,
                original_title: item.original_title,
                poster: item.poster_path,
                backdrop: item.backdrop_path,
                text: item.overview,
                url: generateSlug(item.media_type, item.title, item.id),
                vote: item.vote_average,
                media_type: item.media_type,
            };
        case TV_KEY:
            return {
                id: item.id,
                title: item.name,
                original_title: item.original_name,
                poster: item.poster_path,
                backdrop: item.backdrop_path,
                text: item.overview,
                url: generateSlug(item.media_type, item.name, item.id),
                vote: item.vote_average,
                media_type: item.media_type,
            };
    }
};

export const itemsByMediaType = (items: Api.Item[]): App.Item[] => {
    return items.map(item => itemByMediaType(item));
};

export const itemDetailsByMediaType = (item: Api.ItemDetails): App.ItemDetails => {
    switch (item.media_type) {
        case MOVIE_KEY:
            return {
                id: item.id,
                title: item.title,
                original_title: item.original_title,
                poster: item.poster_path,
                backdrop: item.backdrop_path,
                text: item.overview,
                url: generateSlug(item.media_type, item.title, item.id),
                genres: item.genres,
                infos: [
                    parseDate(item.release_date),
                    item.runtime ? item.runtime + " min" : null,
                    item.genres.map(genre => genre.name).join(", "),
                ],
                vote: item.vote_average,
                media_type: item.media_type,
            };
        case TV_KEY:
            return {
                id: item.id,
                title: item.name,
                original_title: item.original_name,
                poster: item.poster_path,
                backdrop: item.backdrop_path,
                text: item.overview,
                url: generateSlug(item.media_type, item.name, item.id),
                genres: item.genres,
                infos: [item.genres.map(genre => genre.name).join(", ")],
                media_type: item.media_type,
                vote: item.vote_average,
                seasons: item.seasons,
            };
    }
};

export const itemsDetailsByMediaType = (items: Api.ItemDetails[]): App.ItemDetails[] => {
    return items.map(item => itemDetailsByMediaType(item));
};
