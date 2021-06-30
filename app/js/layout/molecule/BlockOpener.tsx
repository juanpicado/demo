import React from "react";
import Image from "next/image";
import { generateImageUrl } from "../../lib/util/Urls";
import { Button } from "../atom/Button";
import { cutText } from "../../lib/util/Text";
import { App } from "../../../types/app";
import { classes } from "../../lib/util/Classes";
import { Icon, Star } from "../../lib/util/Icon";
import { useWatchlist } from "../../context/Watchlist/WatchlistProvider";

interface BlockOpenerProps extends App.ItemDetails {
    hasBookmark: boolean;
    toggleWatchlistItem: (item: App.ItemDetails) => void;
    isDetailsPage?: boolean;
}

export const BlockOpener: React.FC<BlockOpenerProps> = ({
    hasBookmark,
    toggleWatchlistItem,
    isDetailsPage,
    ...item
}) => {
    return (
        <div className="block-opener">
            <div className="block-opener-inner">
                <h1 className="block-opener-headline">{item.title}</h1>
                <div className="block-opener-info">
                    {item.infos &&
                        item.infos.length > 0 &&
                        item.infos.map((info, index) => {
                            if (!info) return null;

                            return (
                                <React.Fragment key={info + index}>
                                    <span>{info}</span>
                                    <span className="block-opener-info-separator" />
                                </React.Fragment>
                            );
                        })}
                </div>
                <div className="block-opener-text">
                    {!isDetailsPage ? cutText(item.text) : item.text}
                </div>
                <div className="block-opener-controls">
                    <Button action={"/watch" + item.url}>Play</Button>
                    {!isDetailsPage && (
                        <Button action={item.url} isSecondary>
                            More info
                        </Button>
                    )}
                    <button
                        type="button"
                        className={classes({
                            "block-opener-watchlist-button": true,
                            "is-active": hasBookmark,
                        })}
                        onClick={() => toggleWatchlistItem(item)}>
                        <Icon name="star" icon={Star} />
                    </button>
                </div>
            </div>
            {item.backdrop && (
                <div className="block-opener-background">
                    <Image
                        className="block-opener-background-image"
                        src={generateImageUrl(item.backdrop, "original")}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="50% 20%"
                    />
                </div>
            )}
            <div className="block-opener-bottom-overlay" />
            <div className="block-opener-left-overlay" />
        </div>
    );
};
