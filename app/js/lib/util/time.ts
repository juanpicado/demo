export const secondsTimeToTimestamp = (t: number): string => {
    let min = Math.floor(t);
    let dec = t - min;

    const sec = 1 / 60;
    dec = sec * Math.round(dec / sec);

    let seconds = Math.floor(dec * 59).toString();

    if (seconds.length < 2) {
        seconds = "0" + seconds;
    }

    let minutes = min.toString();

    if (minutes.length < 2) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
};
