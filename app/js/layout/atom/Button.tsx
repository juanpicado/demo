import React from "react";
import Link from "next/link";
import { classes } from "../../lib/util/classes";

interface ButtonProps {
    action: string | (() => void);
    isSecondary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ isSecondary, action, children }) => {
    return "string" === typeof action ? (
        <Link href={action} passHref>
            <a
                className={classes({
                    button: true,
                    "is-secondary": isSecondary,
                })}>
                <span className="button-text">{children}</span>
            </a>
        </Link>
    ) : (
        <button
            type="button"
            className={classes({
                button: true,
                "is-secondary": isSecondary,
            })}
            onClick={action}>
            <span className="button-text">{children}</span>
        </button>
    );
};
