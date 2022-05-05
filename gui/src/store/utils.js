export const updateObject = (oldObject, updateProperties) => {
    /* merge objects */
    return {
        ...oldObject,
        ...updateProperties,
    };
};

// sleep time expects milliseconds
export const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}
