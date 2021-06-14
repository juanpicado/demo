import React from "react";
import { AppProps } from "next/app";
import "../app/scss/app.scss";
import { Navigation } from "../app/js/molecule/Navigation";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <React.Fragment>
            {!pageProps.hideNav && <Navigation />}
            <Component {...pageProps} />
        </React.Fragment>
    );
};

export default App;
