export const getType = type => {
    if (type === 0) return 'patterns';
    if (type === 1) return 'chunks_verb';
    if (type === 2) return 'chunks_adverb';
    return null;
};

export const getTypeSize = () => {
    return 3;
};
