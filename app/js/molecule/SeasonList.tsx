import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { App } from "../../types/app";
import { getSeasonById } from "../lib/api/backend";
import { generateImageUrl, generateItemUrl } from "../lib/util/Urls";
import { Spinner } from "../atom/Spinner";
import { Icon, Play } from "../lib/util/Icon";

interface SeasonList extends App.Season {
    tv_id: number;
    initialEpisodes?: App.Episode[] | null;
}

export const SeasonList: React.FC<SeasonList> = ({
    tv_id,
    season_number,
    initialEpisodes = null,
}) => {
    const [episodes, setEpisodes] = useState<App.Episode[] | null>(initialEpisodes);

    useEffect(() => {
        getEpisodes().catch(console.error);

        return () => setEpisodes(null);
    }, [tv_id, season_number]);

    const getEpisodes = async () => {
        const { episodes } = await getSeasonById(tv_id, season_number);
        setEpisodes(episodes);
    };

    return (
        <div className="season-list">
            {episodes ? (
                episodes.map((episode, index) => (
                    <Link key={index} href={"/watch" + generateItemUrl("tv", episode.name, tv_id)}>
                        <button type="button" className="season-list-episode">
                            <span className="season-list-episode-group">
                                <span className="season-list-episode-number">{index + 1}</span>
                                <div className="season-list-episode-image">
                                    {episode.still_path && (
                                        <Image
                                            src={generateImageUrl(episode.still_path)}
                                            alt={episode.name}
                                            objectFit="cover"
                                            layout="fill"
                                        />
                                    )}
                                </div>
                                <span className="season-list-episode-name"> {episode.name}</span>
                            </span>
                            <Icon name="play" icon={Play} />
                        </button>
                    </Link>
                ))
            ) : (
                <div className="season-list-loading">
                    <Spinner />
                </div>
            )}
        </div>
    );
};
