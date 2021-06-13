import React, { useEffect, useState } from "react";
import { Api } from "../../types/api";
import { BlockSlider } from "./BlockSlider";
import { getItemsByGenre } from "../lib/api/backend";

export const BlockGenre: React.FC<Api.Genre> = ({ id, name, media_type }) => {
    const [items, setItems] = useState<Api.Item[] | null>(null);

    useEffect(() => {
        fetchItems().catch(console.error);
    }, []);

    const fetchItems = async () => {
        const results = await getItemsByGenre(id, media_type);
        setItems(results);
    };

    if (!items) return null;

    return <BlockSlider title={name} items={items} mediaType={media_type} />;
};
