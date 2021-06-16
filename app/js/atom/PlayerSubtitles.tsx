import React, { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { Icon, Text } from "../lib/util/Icon";
import { classes } from "../lib/util/Classes";

interface PlayerSubtitlesProps {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const PlayerSubtitles: React.FC<PlayerSubtitlesProps> = ({ onMouseEnter, onMouseLeave }) => {
    const { subtitles, activeSubtitle, toggleSubtitles } = usePlayer();
    const [active, setActive] = useState<boolean>(false);

    return (
        <div className="player-subtitles" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {subtitles && Object.keys(subtitles).length > 0 && (
                <div className="player-subtitles-list">
                    <div className="player-subtitles-title">Subtitles</div>
                    <div className="player-subtitles-list-inner">
                        {Object.keys(subtitles).map((language, index) => (
                            <button
                                type="button"
                                key={index}
                                className={classes({
                                    "player-subtitles-item": true,
                                    "is-active": activeSubtitle === language,
                                })}
                                onClick={() => toggleSubtitles(language)}>
                                {subtitles[language]}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <button type="button" className="player-subtitles-button">
                <Icon name="text" icon={Text} />
            </button>
        </div>
    );
};
