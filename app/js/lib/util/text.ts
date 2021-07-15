export const cutText = (text: string, limit = 100): string => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
};
