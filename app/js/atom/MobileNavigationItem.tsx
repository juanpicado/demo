import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { classes } from "../lib/util/Classes";

interface MobileNavigationItem {
    href: string;
}

export const MobileNavigationItem: React.FC<MobileNavigationItem> = ({ href, children }) => {
    const router = useRouter();

    return (
        <div
            className={classes({
                "mobile-navigation-item": true,
                "is-active": router.asPath.includes(href),
            })}>
            <Link href={href}>{children}</Link>
        </div>
    );
};
