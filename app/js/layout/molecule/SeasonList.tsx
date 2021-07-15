import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { App } from "../../../types/app";
import { getSeasonById } from "../../lib/api/backend";
import { generateImageUrl, generateSlug } from "../../lib/util/url";
import { Spinner } from "../atom/Spinner";
import { Icon, Play } from "../../lib/util/Icon";
import { cutText } from "../../lib/util/text";

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
                    <Link
                        key={index}
                        href={"/watch" + generateSlug("tv", episode.name, tv_id)}
                        passHref>
                        <a className="season-list-episode">
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
                            <div className="season-list-episode-text">
                                <div className="season-list-episode-name">{episode.name}</div>
                                <div className="season-list-episode-overview">
                                    {cutText(episode.overview, 150)}
                                </div>
                            </div>
                            <Icon name="play" icon={Play} />
                        </a>
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
