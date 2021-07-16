import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import { useRouter } from "next/router";
import { App } from "../../../types/app";
import { PopUpFrame } from "../molecule/PopUpFrame";
import { useWatchlist } from "../../context/Watchlist/WatchlistProvider";
import { getItemsByGenre, getRecommendations } from "../../lib/api/backend";
import { preloadItem } from "../../lib/redux/reducer/items";
import { MediaTypes } from "../../lib/util/media-types";

export const PopUp: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id, media } = router.query;
    const { hasBookmark, toggleWatchlistItem } = useWatchlist();
    const { entities, fetchRequests } = useSelector((state: RootState) => state.items);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const [item, setItem] = useState<App.ItemDetails | null>(null);
    const [recommendations, setRecommendations] = useState<App.Item[] | null>(null);

    useEffect(() => {
        if (!stageRef.current) {
            return;
        }

        stageRef.current.scrollTop = 0;

        return () => setRecommendations(null);
    }, [id]);

    useEffect(() => {
        if (!id || !media || "string" !== typeof id || "string" !== typeof media) {
            setItem(null);
            return;
        }

        const entity = entities[id];

        if (entity) {
            document.body.classList.add("no-scroll");
            setItem(entity);
        } else if (!fetchRequests.includes(parseInt(id, 10))) {
            dispatch(preloadItem({ id: parseInt(id, 10), type: media as MediaTypes }));
        }

        return () => document.body.classList.remove("no-scroll");
    }, [id, entities, media]);

    useEffect(() => {
        if (!item) {
            return;
        }

        fetchRecommendation().catch(console.error);
    }, [item]);

    const fetchRecommendation = async () => {
        if (!item) {
            return;
        }

        const res = await getRecommendations(item.id, item.media_type);

        // API doesn't support hits per page
        setRecommendations(res.filter(rec => rec.id !== item.id).slice(0, 8));
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
                        router.push(
                            { query: { ...router.query, id: undefined, media: undefined } },
                            undefined,
                            {
                                shallow: true,
                            }
                        )
                    }
                />
            </div>
            <button type="button" className="popup-overlay" />
        </div>
    );
};
