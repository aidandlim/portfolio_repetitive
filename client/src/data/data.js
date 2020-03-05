import axios from 'axios';

export const getPatterns = cb => {
    axios.get('/api/patterns').then(res => {
        cb(res);
    });
};

export const getChunksVerb = cb => {
    axios.get('/api/chunks/verb').then(res => {
        cb(res);
    });
};

export const getChunksAdverb = cb => {
    axios.get('/api/chunks/adverb').then(res => {
        cb(res);
    });
};

export const postPatterns = (english, korean, cb) => {
    axios.post('/api/patterns', { english, korean }).then(res => {
        cb(res);
    });
};

export const postChunksVerb = (english, korean, cb) => {
    axios.post('/api/chunks/verb', { english, korean }).then(res => {
        cb(res);
    });
};

export const postChunksAdverb = (english, korean, cb) => {
    axios.post('/api/chunks/adverb', { english, korean }).then(res => {
        cb(res);
    });
};

export const deletePatterns = (id, cb) => {
    axios.delete('/api/patterns', { params: { id } }).then(res => {
        cb(res);
    });
};

export const deleteChunksVerb = (id, cb) => {
    axios.delete('/api/chunks/verb', { params: { id } }).then(res => {
        cb(res);
    });
};

export const deleteChunksAdverb = (id, cb) => {
    axios.delete('/api/chunks/adverb', { params: { id } }).then(res => {
        cb(res);
    });
};