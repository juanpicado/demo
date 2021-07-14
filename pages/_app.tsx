import React, { useEffect } from "react";
import "../app/scss/app.scss";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { AppProps } from "next/app";
import { Navigation } from "../app/js/layout/organism/Navigation";
import { useRouter } from "next/router";
import { WatchlistProvider } from "../app/js/context/Watchlist/WatchlistProvider";
import { Provider } from "react-redux";
import { store } from "../app/js/lib/store";

NProgress.configure({ showSpinner: false });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", () => NProgress.start());
        router.events.on("routeChangeComplete", () => NProgress.done());
        router.events.on("routeChangeError", () => NProgress.done());
    }, []);

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
