export const getType = type => {
    if (type === 0) return 'patterns';
    if (type === 1) return 'chunks';
    return null;
};

export const getTypeSize = () => {
    return 2;
};
