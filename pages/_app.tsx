import React from "react";
import "../app/scss/app.scss";
import { AppProps } from "next/app";
import { Navigation } from "../app/js/layout/organism/Navigation";
import { useRouter } from "next/router";
import { WatchlistProvider } from "../app/js/context/Watchlist/WatchlistProvider";
import { Provider } from "react-redux";
import { store } from "../app/js/lib/store";
import { useNProgress } from "../app/js/lib/util/NProgress";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
    useNProgress();

    return (
        <Provider store={store}>
            <WatchlistProvider>
                {!pageProps.hideNav && <Navigation />}
                <Component {...pageProps} key={router.asPath} />
            </WatchlistProvider>
        </Provider>
    );
};

export default App;
