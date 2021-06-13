import React from "react";
import classnames from "classnames";

interface ButtonProps {
    onClick: () => void;
    isSecondary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isSecondary, onClick }) => {
    return (
        <button
            type="button"
            className={classnames({
                button: true,
                "is-secondary": isSecondary,
            })}
            onClick={onClick}>
            {children}
        </button>
    );
};
