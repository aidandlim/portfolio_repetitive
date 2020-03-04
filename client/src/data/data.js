import axios from 'axios';

export const getPatterns = cb => {
    axios.get('/api/patterns').then(res => {
        cb(res);
    });
};

export const getChunks = cb => {
    axios.get('/api/chunks').then(res => {
        cb(res);
    });
};

export const postPatterns = (english, korean, cb) => {
    axios.post('/api/patterns', { english, korean }).then(res => {
        cb(res);
    });
};

export const postChunks = (english, korean, cb) => {
    axios.post('/api/chunks', { english, korean }).then(res => {
        cb(res);
    });
};

export const putPatterns = (id, english, korean, cb) => {
    axios.put('/api/patterns', { id, english, korean }).then(res => {
        cb(res);
    });
};

export const putChunks = (id, english, korean, cb) => {
    axios.put('/api/chunks', { id, english, korean }).then(res => {
        cb(res);
    });
};

export const deletePatterns = (id, cb) => {
    axios.delete('/api/patterns', { params: { id } }).then(res => {
        cb(res);
    });
};

export const deleteChunks = (id, cb) => {
    axios.delete('/api/chunks', { params: { id } }).then(res => {
        cb(res);
    });
};