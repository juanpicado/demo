import React from "react";
import Link from "next/link";
import { classes } from "../lib/util/Classes";

interface NavigationLinkProps {
    href: string;
    active: boolean;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({ href, active, children }) => {
    return (
        <div
            className={classes({
                "navigation-link": true,
                "is-active": active,
            })}>
            <Link href={href}>{children}</Link>
        </div>
    );
};
