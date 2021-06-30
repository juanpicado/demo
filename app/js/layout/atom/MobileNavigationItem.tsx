import React from "react";
import Link from "next/link";
import { classes } from "../../lib/util/Classes";

interface MobileNavigationItem {
    href: string;
    active: boolean;
}

export const MobileNavigationItem: React.FC<MobileNavigationItem> = ({
    href,
    active,
    children,
}) => {
    return (
        <div
            className={classes({
                "mobile-navigation-item": true,
                "is-active": active,
            })}>
            <Link href={href}>{children}</Link>
        </div>
    );
};
