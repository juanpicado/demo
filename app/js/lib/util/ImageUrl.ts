export const generateImageUrl = (path: string, size: number | string = 500): string => {
    return `https://image.tmdb.org/t/p/${"string" === typeof size ? size : "w" + size}${path}`;
};
