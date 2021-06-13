export const classes = (args: Record<string, boolean | undefined>) => {
    return Object.keys(args).map(key => {
        if (args[key]) {
            return key;
        }
    }).join(" ");
}
