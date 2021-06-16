import React from "react";
import Link from "next/link";
import Image from "next/image";
import { generateImageUrl } from "../lib/util/Urls";
import { CardProgress } from "../atom/CardProgress";
import { App } from "../../types/app";

interface CardProps extends App.Item {
    imageSize?: string;
}

export const Card: React.FC<CardProps> = ({ title, image, url, imageSize }) => {
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
                        <div className="card-frame-title">{title}</div>
                        <CardProgress />
                    </div>
                </div>
            </button>
        </Link>
    );
};
