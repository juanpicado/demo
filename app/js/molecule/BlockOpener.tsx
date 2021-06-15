import React from "react";
import { generateImageUrl } from "../lib/util/Urls";
import { Button } from "../atom/Button";
import { cutText } from "../lib/util/Text";
import { App } from "../../types/app";

export const BlockOpener: React.FC<App.ItemDetails> = ({ title, text, image, url, infos }) => {
    return (
        <div className="block-opener">
            <div className="block-opener-inner">
                <h1 className="block-opener-headline">{title}</h1>
                <div className="block-opener-info">
                    {infos &&
                        infos.length > 0 &&
                        infos.map((info, index) => {
                            if (!info) return null;

                            return (
                                <React.Fragment key={info + index}>
                                    <span>{info}</span>
                                    <span className="block-opener-info-separator" />
                                </React.Fragment>
                            );
                        })}
                </div>
                <div className="block-opener-text">{cutText(text)}</div>
                <div className="block-opener-controls">
                    <Button action={"/watch" + url}>Play</Button>
                    <Button action={url} isSecondary>
                        More info
                    </Button>
                </div>
            </div>
            {image && (
                <div className="block-opener-background">
                    <img
                        className="block-opener-background-image"
                        src={generateImageUrl(image, "original")}
                        alt={title}
                        loading="eager"
                    />
                </div>
            )}
            <div className="block-opener-bottom-overlay" />
            <div className="block-opener-left-overlay" />
        </div>
    );
};
