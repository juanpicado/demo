import React from "react";
import classnames from "classnames";
import Link from "next/link";

interface ButtonProps {
    action: string | (() => void);
    isSecondary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ isSecondary, action, children }) => {
    return "string" === typeof action ? (
        <Link href={action}>
            <button
                type="button"
                className={classnames({
                    button: true,
                    "is-secondary": isSecondary,
                })}>
                <span className="button-text">{children}</span>
            </button>
        </Link>
    ) : (
        <button
            type="button"
            className={classnames({
                button: true,
                "is-secondary": isSecondary,
            })}
            onClick={action}>
            <span className="button-text">{children}</span>
        </button>
    );
};
