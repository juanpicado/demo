import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { useRouter } from "next/router";
import { App } from "../../types/app";

export const PopUp: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { entities } = useSelector((state: RootState) => state.items);
    const [item, setItem] = useState<App.ItemDetails | null>(null);

    useEffect(() => {
        if (!id || "string" !== typeof id) {
            return;
        }

        const entity = entities[id];

        if (entity) {
            setItem(entity);
        }
    }, [id, entities]);

    if (!item) return null;

    return <div>{item.title}</div>;
};
