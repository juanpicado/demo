import React, { useEffect, useState } from "react";
import { App } from "../../types/app";
import { SeasonList } from "../molecule/SeasonList";
import { Dropdown } from "../atom/Dropdown";

interface BlockSeasonsProps {
    seasons: App.Season[];
    tvId: number;
}

export const BlockSeasons: React.FC<BlockSeasonsProps> = ({ seasons, tvId }) => {
    const [activeSeason, setActiveSeason] = useState<number>(0);

    useEffect(() => {
        return () => setActiveSeason(0);
    }, []);

    return (
        <div className="block-seasons">
            <div className="block-seasons-head">
                <div className="block-seasons-head-group">
                    <span className="season-list-name">Episodes</span>
                    <span className="season-list-episode-count">
                        {seasons.length} Season{seasons.length > 1 ? "s" : ""}
                    </span>
                </div>
                {seasons.length > 1 && (
                    <Dropdown
                        options={seasons.map(season => season.name)}
                        activeOption={activeSeason}
                        onSelect={setActiveSeason}
                    />
                )}
            </div>
            <div className="block-seasons-inner">
                <SeasonList tvId={tvId} {...seasons[activeSeason]} />
            </div>
        </div>
    );
};
