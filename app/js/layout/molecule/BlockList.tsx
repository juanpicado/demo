import React from "react";
import { App } from "../../../types/app";
import { Card } from "./Card";

interface CardListProps {
    title?: string;
    items: (App.Item | App.ItemDetails)[];
}

export const BlockList: React.FC<CardListProps> = ({ items, title }) => {
    return (
        <div className="block-list">
            {title && <div className="block-list-title">{title}</div>}
            <div className="block-list-frame">
                {items.map(item => (
                    <Card {...item} />
                ))}
            </div>
        </div>
    );
};
