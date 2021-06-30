import React from "react";
import { MobileNavigationItem } from "../atom/MobileNavigationItem";
import { useRouter } from "next/router";

export const MobileNavigation: React.FC = () => {
    const router = useRouter();

    return (
        <div className="mobile-navigation">
            <div className="mobile-navigation-inner">
                <MobileNavigationItem href="/movie" active={router.pathname === "/movie"}>
                    Movies
                </MobileNavigationItem>
                <MobileNavigationItem href="/tv" active={router.pathname === "/tv"}>
                    TV Shows
                </MobileNavigationItem>
                <MobileNavigationItem href="/watchlist" active={router.pathname === "/watchlist"}>
                    Watchlist
                </MobileNavigationItem>
            </div>
        </div>
    );
};
