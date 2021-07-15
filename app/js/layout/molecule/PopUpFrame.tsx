import React from "react";
import { Button } from "../atom/Button";
import Image from "next/image";
import { generateImageUrl } from "../../lib/util/url";
import { App } from "../../../types/app";
import { BlockSeasons } from "../organism/BlockSeasons";
import { Close, Icon } from "../../lib/util/Icon";
import { WatchlistButton } from "../atom/WatchlistButton";

interface PopUpFrame {
    item: App.ItemDetails;
    recommendations: App.Item[] | null;
    onClose: () => void;
    bookmarked: boolean;
    toggleWatchlist: () => void;
}

export const PopUpFrame: React.FC<PopUpFrame> = ({ item, onClose }) => {
    return (
        <div className="popup-frame">
            <button type="button" className="popup-close" onClick={onClose}>
                <Icon name="close" icon={Close} />
            </button>
            <div className="popup-head">
                <div className="popup-head-content">
                    <h1 className="popup-title">{item.title}</h1>
                    <div className="popup-controls">
                        <Button action={"/watch" + item.url}>Play</Button>
                        <WatchlistButton item={item} />
                    </div>
                </div>
                <div className="popup-background-overlay" />
                {item.backdrop && (
                    <Image
                        src={generateImageUrl(item.backdrop, "original")}
                        className="popup-background"
                        layout="fill"
                        objectFit="cover"
                    />
                )}
            </div>
            <div className="popup-inner">
                <div className="popup-content">
                    <div className="popup-text">{item.text}</div>
                </div>
                {item.seasons && <BlockSeasons seasons={item.seasons} tv_id={item.id} />}
            </div>
        </div>
    );
};
