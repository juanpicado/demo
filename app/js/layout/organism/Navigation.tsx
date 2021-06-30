import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NavigationLink } from "../atom/NavigationLink";
import { MOVIE_KEY, TV_KEY } from "../../lib/util/MediaTypes";
import { useRouter } from "next/router";
import { MobileNavigation } from "../molecule/MobileNavigation";
import { Icon, Hamburger, Close, SearchIcon } from "../../lib/util/Icon";
import { classes } from "../../lib/util/Classes";
import { Search } from "../molecule/Search";

export const Navigation: React.FC = () => {
    const router = useRouter();
    const { type } = router.query;
    const [mobileActive, setMobileActive] = useState<boolean>(false);
    const [searchActive, setSearchActive] = useState<boolean>(false);

    useEffect(() => {
        setMobileActive(false);
        setSearchActive(false);
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
                <div className="navigation-controls-group">
                    <button
                        type="button"
                        className="navigation-search"
                        onClick={() => {
                            setSearchActive(prevState => !prevState);
                            setMobileActive(false);
                        }}>
                        {searchActive ? (
                            <Icon name="close" icon={Close} />
                        ) : (
                            <Icon name="search" icon={SearchIcon} />
                        )}
                    </button>
                    <div
                        className="navigation-hamburger"
                        onClick={() => {
                            setMobileActive(prevState => !prevState);
                            setSearchActive(false);
                        }}>
                        {mobileActive ? (
                            <Icon name="close" icon={Close} />
                        ) : (
                            <Icon name="hamburger" icon={Hamburger} />
                        )}
                    </div>
                </div>
            </div>
            <MobileNavigation />
            {searchActive && <Search type={type && "string" === typeof type ? type : undefined} />}
        </div>
    );
};
