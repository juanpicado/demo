import React, { useEffect, useRef, useState } from "react";
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
    const stageRef = useRef<HTMLDivElement | null>(null);
    const [item, setItem] = useState<App.ItemDetails | null>(null);
    const [recommendations, setRecommendations] = useState<App.Item[] | null>(null);

    useEffect(() => {
        if (!stageRef.current) {
            return;
        }

        stageRef.current.scrollTop = 0;

        return () => reset();
    }, [id]);

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

        // API doesn't support hits per page
        setRecommendations(res.filter(rec => rec.id !== item.id).slice(0, 8));
    };

    const reset = () => {
        setItem(null);
        setRecommendations(null);
    };

    if (!item) return null;

    return (
        <div className="popup">
            <div ref={stageRef} className="popup-stage">
                <PopUpFrame
                    key={item.id}
                    item={item}
                    recommendations={recommendations}
                    bookmarked={hasBookmark(item.id)}
                    toggleWatchlist={() => toggleWatchlistItem(item)}
                    onClose={() =>
                        router.push({ query: { ...router.query, id: undefined } }, undefined, {
                            shallow: true,
                        })
                    }
                />
            </div>
            <button type="button" className="popup-overlay" />
        </div>
    );
};
