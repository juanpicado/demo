import { Api } from "./api";
import { MediaTypes } from "../js/lib/util/MediaTypes";

export namespace App {
    interface Item {
        id: number;
        title: string;
        original_title: string;
        image: string | null;
        text: string;
        url: string;
        media_type: MediaTypes;
    }

    interface ItemDetails {
        id: number;
        title: string;
        original_title: string;
        image: string | null;
        text: string;
        url: string;
        infos: Info[];
        genres: Api.Genre[];
        media_type: MediaTypes;
    }

    type Info = string | null;
}
