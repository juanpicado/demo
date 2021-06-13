export namespace App {
    interface Item {
        title: string;
        original_title: string;
        image: string | null;
        text: string;
        url: string;
    }

    interface ItemDetails {
        title: string;
        original_title: string;
        image: string | null;
        text: string;
        url: string;
        infos: Info[];
    }

    type Info = string | null;
}
