export const generateSlug = (type: string, title: string, id: number): string => {
    if (!title) {
        return "";
    }

    return `/${type}/${encodeURIComponent(`${title.toLowerCase()}-${id}`)}`;
};

export const idFromSlug = (slug: string): string => {
    const id = slug.match(/-([^\-]+)\/?$/);
    return id ? id[1] : "" || "";
};

export const generateImageUrl = (path: string, size: number | string = 500): string => {
    return `https://image.tmdb.org/t/p/${"string" === typeof size ? size : "w" + size}${path}`;
};
