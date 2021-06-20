import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NavigationLink } from "../atom/NavigationLink";
import { MOVIE_KEY, TV_KEY } from "../lib/util/MediaTypes";
import { useRouter } from "next/router";
import { MobileNavigation } from "./MobileNavigation";
import { Icon, Hamburger, Close } from "../lib/util/Icon";
import { classes } from "../lib/util/Classes";

export const Navigation: React.FC = () => {
    const router = useRouter();
    const [mobileActive, setMobileActive] = useState<boolean>(false);

    useEffect(() => {
        setMobileActive(false);
    }, [router.asPath]);

    return (
        <div
            className={classes({
                navigation: true,
                "mobile-active": mobileActive,
            })}>
            <div className="navigation-inner">
                <div className="navigation-logo">
                    <Link href="/">
                        <button type="button">
                            Stream
                            <span className="navigation-highlight">io</span>
                        </button>
                    </Link>
                </div>
                <div className="navigation-link-group">
                    <NavigationLink
                        href={`/${MOVIE_KEY}`}
                        active={router.asPath.includes(MOVIE_KEY)}>
                        Movies
                    </NavigationLink>
                    <NavigationLink href={`/${TV_KEY}`} active={router.asPath.includes(TV_KEY)}>
                        TV Shows
                    </NavigationLink>
                    <NavigationLink
                        href={`/watchlist`}
                        active={router.asPath.includes("watchlist")}>
                        Watchlist
                    </NavigationLink>
                </div>
                <div
                    className="navigation-hamburger"
                    onClick={() => setMobileActive(prevState => !prevState)}>
                    {mobileActive ? (
                        <Icon name="close" icon={Close} />
                    ) : (
                        <Icon name="hamburger" icon={Hamburger} />
                    )}
                </div>
            </div>
            <MobileNavigation />
        </div>
    );
};
