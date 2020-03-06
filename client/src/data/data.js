import axios from 'axios';

export const get = (type, cb) => {
    axios.get(`/api/${type}`).then(res => {
        cb(res);
    });
};

export const post = (type, english, korean, cb) => {
    axios.post(`/api/${type}`, { english, korean }).then(res => {
        cb(res);
    });
};

export const remove = (type, id, cb) => {
    axios.delete(`/api/${type}/${id}`).then(res => {
        cb(res);
    });
};