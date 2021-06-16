import React, { useState } from "react";
import { ChevronDown, Icon } from "../lib/util/Icon";
import { classes } from "../lib/util/Classes";

interface DropdownProps {
    options: string[];
    activeOption: number;
    onSelect: (value: number) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, activeOption, onSelect }) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <div
            className={classes({
                dropdown: true,
                "is-active": active,
            })}>
            <button
                type="button"
                className="dropdown-head"
                onClick={() => setActive(prevState => !prevState)}>
                <span className="dropdown-head-title">{options[activeOption]}</span>
                <Icon name="chevron-down" icon={ChevronDown} />
            </button>
            {active && (
                <div className="dropdown-list">
                    {options.map((option, index) => (
                        <button
                            type="button"
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                                setActive(false);
                                onSelect(index);
                            }}>
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
