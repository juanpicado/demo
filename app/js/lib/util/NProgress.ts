import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

NProgress.configure({ showSpinner: false });

export const useNProgress = () => {
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", () => NProgress.start());
        router.events.on("routeChangeComplete", () => NProgress.done());
        router.events.on("routeChangeError", () => NProgress.done());
    }, []);
};
