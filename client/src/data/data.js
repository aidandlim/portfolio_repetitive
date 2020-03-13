import axios from 'axios';

export const get = (login, type, cb) => {
    axios.get(`/api/${login}/${type}`).then(res => {
        cb(res);
    });
};

export const post = (login, type, english, korean, cb) => {
    axios.post(`/api/${login}/${type}`, { english, korean }).then(res => {
        cb(res);
    });
};

export const update = (login, type, id, english, korean, cb) => {
    const data = {
        id,
        english,
        korean
    };

    axios.put(`/api/${login}/${type}`, data).then(res => {
        cb(res);
    });
};

export const remove = (login, type, id, cb) => {
    axios.delete(`/api/${login}/${type}/${id}`).then(res => {
        cb(res);
    });
};
