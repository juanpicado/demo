import React from "react";
import { App } from "../../../types/app";

interface ItemInfoProps {
    infos: App.Info[];
}

export const ItemInfo: React.FC<ItemInfoProps> = ({ infos }) => {
    return (
        <div className="item-info">
            {infos.length > 0 &&
                infos.map((info, index) => {
                    if (!info) return null;

                    return (
                        <React.Fragment key={info + index}>
                            <span>{info}</span>
                            <span className="item-info-separator" />
                        </React.Fragment>
                    );
                })}
        </div>
    );
};
