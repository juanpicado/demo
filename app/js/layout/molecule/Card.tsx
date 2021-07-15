import React from "react";
import Image from "next/image";
import { generateImageUrl } from "../../lib/util/url";
import { CardProgress } from "../atom/CardProgress";
import { App } from "../../../types/app";
import { usePrefetch } from "../../lib/util/prefetch";
import { Rating } from "../atom/Rating";

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
                    <div className="card-frame-group">
                        {item.vote > 0 && <Rating vote={item.vote} />}
                        <CardProgress id={item.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};
