import React from "react";
import Link from "next/link";
import Image from "next/image";
import { generateImageUrl } from "../lib/util/Urls";
import { CardProgress } from "../atom/CardProgress";
import { App } from "../../types/app";
import { cutText } from "../lib/util/Text";

interface CardProps extends App.Item {
    imageSize?: string;
}

export const Card: React.FC<CardProps> = ({ title, text, image, url, imageSize }) => {
    if (!image) return null;

    return (
        <Link href={url}>
            <button type="button" className="card">
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
                            <div className="card-frame-title">{title}</div>
                            <div className="card-frame-text">{cutText(text)}</div>
                        </div>
                        <CardProgress />
                    </div>
                </div>
            </button>
        </Link>
    );
};
