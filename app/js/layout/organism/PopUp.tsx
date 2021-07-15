import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { useRouter } from "next/router";
import { App } from "../../../types/app";
import { PopUpFrame } from "../molecule/PopUpFrame";
import { useWatchlist } from "../../context/Watchlist/WatchlistProvider";
import { getItemsByGenre } from "../../lib/api/backend";

export const PopUp: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { hasBookmark, toggleWatchlistItem } = useWatchlist();
    const { entities } = useSelector((state: RootState) => state.items);
    const [item, setItem] = useState<App.ItemDetails | null>(null);
    const [recommendations, setRecommendations] = useState<App.Item[] | null>(null);

    useEffect(() => {
        if (!id || "string" !== typeof id) {
            setItem(null);
            return;
        }

        const entity = entities[id];

        if (entity) {
            document.body.classList.add("no-scroll");
            setItem(entity);
        }

        return () => document.body.classList.remove("no-scroll");
    }, [id, entities]);

    useEffect(() => {
        if (!item) {
            return;
        }

        getRecommendations().catch(console.error);
    }, [item]);

    const getRecommendations = async () => {
        if (!item) {
            return;
        }

        const genreId = item.genres[0].id;
        const res = await getItemsByGenre(genreId, item.media_type);
        setRecommendations(res.filter(rec => rec.id !== item.id));
    };

    if (!item) return null;

    return (
        <div className="popup">
            <div className="popup-stage">
                <PopUpFrame
                    item={item}
                    recommendations={recommendations}
                    bookmarked={hasBookmark(item.id)}
                    toggleWatchlist={() => toggleWatchlistItem(item)}
                    onClose={() => router.push({ query: {} }, undefined, { shallow: true })}
                />
            </div>
            <button type="button" className="popup-overlay" />
        </div>
    );
};
