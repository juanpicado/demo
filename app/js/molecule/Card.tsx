import React from "react";
import Link from "next/link";
import Image from "next/image";
import { generateImageUrl } from "../lib/util/Urls";
import { CardProgress } from "../atom/CardProgress";
import { App } from "../../types/app";
import { cutText } from "../lib/util/Text";
import { Icon, Star } from "../lib/util/Icon";
import { useWatchlist } from "../context/Watchlist/WatchlistProvider";
import { classes } from "../lib/util/Classes";
import { Button } from "../atom/Button";

interface CardProps extends App.Item {
    imageSize?: string;
}

export const Card: React.FC<CardProps> = ({ title, text, image, url, imageSize, id }) => {
    const { toggleWatchlistItem, hasBookmark, hasProgress } = useWatchlist();

    if (!image) return null;

    const progress = hasProgress(id);

    return (
        <div className="card">
            <div className="card-inner">
                <div className="card-image-wrapper">
                    <Image
                        className="card-image"
                        src={generateImageUrl(image, imageSize)}
                        alt={title}
                        layout="fill"
                    />
                </div>
                <div className="card-frame">
                    <div className="card-frame-group">
                        <div className="card-frame-head">
                            <div className="card-frame-title">{title}</div>
                            <button
                                type="button"
                                className={classes({
                                    "card-frame-watchlist-button": true,
                                    "is-active": hasBookmark(id),
                                })}
                                onClick={() => toggleWatchlistItem(id)}>
                                <Icon name="star" icon={Star} />
                            </button>
                        </div>
                        <div className="card-frame-text">{cutText(text)}</div>
                    </div>
                    <div className="card-frame-controls">
                        <Button action={"/watch" + url}>Play</Button>
                        <Button action={url} isSecondary>
                            More info
                        </Button>
                    </div>
                    {!!progress && <CardProgress />}
                </div>
            </div>
        </div>
    );
};
