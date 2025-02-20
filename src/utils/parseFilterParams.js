const parseFavourite = (favourite) => {
    const isString = typeof favourite === "string";
    if (!isString) return undefined;

    const lowerCaseFavourite = favourite.toLowerCase();
    if (lowerCaseFavourite === "true") return true;
    if (lowerCaseFavourite === "false") return false;

    return undefined;
};

export const parseFilterParams = (query) => {
    const { favourite } = query;

    const parsedFavourite = parseFavourite(favourite);

    return {
        favourite: parsedFavourite,
    };
};