import React from "react";
import { AppProps } from "next/app";
import "../app/scss/app.scss";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default App;
