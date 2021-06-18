export const isFullscreen = () =>
    !!document.fullscreenElement ||
    // @ts-ignore
    !!document.fullScreen ||
    // @ts-ignore
    !!document.mozFullScreen ||
    // @ts-ignore
    !!document.webkitIsFullScreen;

export const requestFullscreen = (video: HTMLVideoElement) => {
    const el = document.documentElement;
    // Different browsers need respective method
    if (el.requestFullscreen) {
        el.requestFullscreen();
        // @ts-ignore
    } else if (el.mozRequestFullScreen) {
        // @ts-ignore
        el.mozRequestFullScreen();
        // @ts-ignore
    } else if (el.webkitRequestFullscreen) {
        // @ts-ignore
        el.webkitRequestFullscreen();
        // @ts-ignore
    } else if (el.msRequestFullscreen) {
        // @ts-ignore
        el.msRequestFullscreen();
        // @ts-ignore
    } else if (video.webkitRequestFullscreen) {
        // @ts-ignore
        video.webkitRequestFullscreen();
        // @ts-ignore
    } else if (video.webkitEnterFullScreen) {
        // @ts-ignore
        video.webkitEnterFullScreen();
        // @ts-ignore
    }
};

export const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        // @ts-ignore
    } else if (document.mozExitFullscreen) {
        // @ts-ignore
        document.mozExitFullscreen();
        // @ts-ignore
    } else if (document.webkitExitFullscreen) {
        // @ts-ignore
        document.webkitExitFullscreen();
    }
};
