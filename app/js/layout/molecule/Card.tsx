import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { generateImageUrl } from "../../lib/util/Urls";
import { CardProgress } from "../atom/CardProgress";
import { App } from "../../../types/app";
import { cutText } from "../../lib/util/Text";
import { Icon, Star } from "../../lib/util/Icon";
import { classes } from "../../lib/util/Classes";
import { useDispatch } from "react-redux";
import { preloadItem } from "../../lib/reducers/items";
import { useRouter } from "next/router";
import { usePrefetch } from "../../lib/util/prefetch";

interface CardProps extends App.Item {
    toggleWatchlistItem: (item: App.Item) => void;
    hasBookmark: boolean;
    progress: number;
    imageSize?: string;
}

export const Card: React.FC<CardProps> = ({
    hasBookmark,
    progress,
    toggleWatchlistItem,
    imageSize,
    ...item
}) => {
    const { onClick, onMouseEnter, onMouseLeave } = usePrefetch(item.id, item.media_type);

    if (!item.poster) return null;

    return (
        <div className="card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="card-inner">
                <button type="button" className="card-image-wrapper" onClick={onClick}>
                    <Image
                        className="card-image"
                        src={generateImageUrl(item.poster, imageSize)}
                        alt={item.title}
                        layout="fill"
                    />
                </button>
                <div className="card-frame">
                    <div className="card-frame-group">
                        <div className="card-frame-head">
                            <div className="card-frame-title">{item.title}</div>
                            <div
                                className={classes({
                                    "card-frame-watchlist-button": true,
                                    "is-active": hasBookmark,
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
        </div>
    );
};
