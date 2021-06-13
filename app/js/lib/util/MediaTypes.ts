import { Api } from "../../../types/api";
import { generateItemUrl } from "./Urls";
import { parseDate } from "./Date";
import { App } from "../../../types/app";

export const MOVIE_KEY = "movie";

export const TV_KEY = "tv";

export const mediaTypes: Record<string, string> = {
    [MOVIE_KEY]: "Movies",
    [TV_KEY]: "TV Shows",
};

export const itemByMediaType = (item: Api.Item): App.Item => {
    switch (item.media_type) {
        case MOVIE_KEY:
            return {
                title: item.title,
                original_title: item.original_title,
                image: item.poster_path,
                text: item.overview,
                url: generateItemUrl(item.media_type, item.title, item.id),
            };
        case TV_KEY:
            return {
                title: item.name,
                original_title: item.original_name,
                image: item.poster_path,
                text: item.overview,
                url: generateItemUrl(item.media_type, item.name, item.id),
            };
    }
};

export const itemDetailsByMediaType = (item: Api.ItemDetails): App.ItemDetails => {
    switch (item.media_type) {
        case MOVIE_KEY:
            return {
                title: item.title,
                original_title: item.original_title,
                image: item.backdrop_path,
                text: item.overview,
                url: generateItemUrl(item.media_type, item.title, item.id),
                infos: [
                    parseDate(item.release_date),
                    item.runtime ? item.runtime + " min" : null,
                    item.genres.map(genre => genre.name).join(", "),
                ],
            };
        case TV_KEY:
            return {
                title: item.name,
                original_title: item.original_name,
                image: item.backdrop_path,
                text: item.overview,
                url: generateItemUrl(item.media_type, item.name, item.id),
                infos: [item.genres.map(genre => genre.name).join(", ")],
            };
    }
};
