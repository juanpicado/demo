import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { generateImageUrl } from "../../lib/util/url";
import { CardProgress } from "../atom/CardProgress";
import { App } from "../../../types/app";
import { cutText } from "../../lib/util/text";
import { Icon, Star } from "../../lib/util/Icon";
import { classes } from "../../lib/util/classes";
import { useDispatch } from "react-redux";
import { preloadItem } from "../../lib/reducers/items";
import { useRouter } from "next/router";
import { usePrefetch } from "../../lib/util/prefetch";
import { WatchlistButton } from "../atom/WatchlistButton";

interface CardProps extends App.Item {
    imageSize?: string;
}

export const Card: React.FC<CardProps> = ({ imageSize, ...item }) => {
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
                    <div className="card-frame-title">{item.title}</div>
                    <CardProgress id={item.id} />
                </div>
            </div>
        </div>
    );
};
