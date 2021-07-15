import React from "react";
import { Check, Icon, Plus } from "../../lib/util/Icon";
import { useWatchlist } from "../../context/Watchlist/WatchlistProvider";
import { App } from "../../../types/app";

interface WatchlistButtonProps {
    item: App.Item | App.ItemDetails;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({ item }) => {
    const { hasBookmark, toggleWatchlistItem } = useWatchlist();

    return (
        <button
            type="button"
            className="watchlist-button"
            onClick={() => toggleWatchlistItem(item)}>
            {hasBookmark(item.id) ? (
                <Icon name="check" icon={Check} />
            ) : (
                <Icon name="plus" icon={Plus} />
            )}
        </button>
    );
};
