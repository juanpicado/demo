import { Api, Season } from "./api";
import { MediaTypes } from "../js/lib/util/media-types";

export namespace App {
    interface Item {
        id: number;
        title: string;
        original_title: string;
        backdrop: string | null;
        poster: string | null;
        text: string;
        url: string;
        media_type: MediaTypes;
    }

    interface ItemDetails {
        id: number;
        title: string;
        original_title: string;
        backdrop: string | null;
        poster: string | null;
        text: string;
        url: string;
        infos: Info[];
        genres: Api.Genre[];
        media_type: MediaTypes;
        seasons?: Season[];
    }

    type Info = string | null;

    type Season = Api.Season;

    type Episode = Api.Episode;
}
