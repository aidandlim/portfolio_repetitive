export const getType = type => {
    if (type === 0) return 'patterns';
    if (type === 1) return 'chunks_main';
    if (type === 2) return 'chunks_extra';
    return null;
};

export const getTypeSize = () => {
    return 3;
};
