import React from "react";
import "../app/scss/app.scss";
import { AppProps } from "next/app";
import { Navigation } from "../app/js/layout/organism/Navigation";
import { useRouter } from "next/router";
import { WatchlistProvider } from "../app/js/context/Watchlist/WatchlistProvider";
import { Provider } from "react-redux";
import { store } from "../app/js/lib/redux/store";
import { PopUp } from "../app/js/layout/organism/PopUp";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    return (
        <Provider store={store}>
            <WatchlistProvider>
                <PopUp />
                {!pageProps.hideNav && <Navigation />}
                <Component {...pageProps} key={router.pathname} />
            </WatchlistProvider>
        </Provider>
    );
};

export default App;
