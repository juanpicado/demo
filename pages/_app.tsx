import React, { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { AppProps } from "next/app";
import "../app/scss/app.scss";
import { Navigation } from "../app/js/molecule/Navigation";
import { useRouter } from "next/router";

NProgress.configure({ showSpinner: false });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", () => NProgress.start());
        router.events.on("routeChangeComplete", () => NProgress.done());
        router.events.on("routeChangeError", () => NProgress.done());
    }, []);

    return (
        <React.Fragment>
            {!pageProps.hideNav && <Navigation />}
            <Component {...pageProps} />
        </React.Fragment>
    );
};

export default App;
