export const generateItemUrl = (title: string, id: string | number): string => {
    return `/item/movie/${title.toLowerCase()}-${id}`;
}

export const cutIdFromSlug = (slug: string): string => {
    const id = slug.match(/-([^\-]+)\/?$/);
    return id ? id[1] : "" || "";
}

export const generateImageUrl = (path: string, size: number | string = 500): string => {
    return `https://image.tmdb.org/t/p/${"string" === typeof size ? size : "w" + size}${path}`;
};
