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

interface CardProps extends App.Item {
    imageSize?: string;
}

export const Card: React.FC<CardProps> = ({ imageSize, ...item }) => {
    const { toggleWatchlistItem, hasBookmark, hasProgress } = useWatchlist();

    if (!item.poster) return null;

    const progress = hasProgress(item.id);

    return (
        <button type="button" className="card">
            <div className="card-inner">
                <Link href={item.url}>
                    <div className="card-image-wrapper">
                        <Image
                            className="card-image"
                            src={generateImageUrl(item.poster, imageSize)}
                            alt={item.title}
                            layout="fill"
                        />
                    </div>
                </Link>
                <div className="card-frame">
                    <div className="card-frame-group">
                        <div className="card-frame-head">
                            <div className="card-frame-title">{item.title}</div>
                            <div
                                className={classes({
                                    "card-frame-watchlist-button": true,
                                    "is-active": hasBookmark(item.id),
                                })}
                                onClick={() => toggleWatchlistItem(item)}>
                                <Icon name="star" icon={Star} />
                            </div>
                        </div>
                        <div className="card-frame-text">{cutText(item.text)}</div>
                    </div>
                    {!!progress && <CardProgress progress={progress} />}
                </div>
            </div>
        </button>
    );
};
