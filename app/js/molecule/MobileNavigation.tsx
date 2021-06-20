import React from "react";
import { MobileNavigationItem } from "../atom/MobileNavigationItem";

export const MobileNavigation: React.FC = () => {
    return (
        <div className="mobile-navigation">
            <div className="mobile-navigation-inner">
                <MobileNavigationItem href="/movie">Movies</MobileNavigationItem>
                <MobileNavigationItem href="/tv">TV Shows</MobileNavigationItem>
                <MobileNavigationItem href="/watchlist">Watchlist</MobileNavigationItem>
            </div>
        </div>
    );
};
