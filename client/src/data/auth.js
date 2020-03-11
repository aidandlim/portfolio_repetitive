import axios from 'axios';

export const getAuth = (username, cb) => {
    axios.get(`/api/auth/${username}`).then(res => {
        cb(res);
    });
};

export const auth = (username, password, cb) => {
    const data = {
        username,
        password
    };

    axios.post(`/api/auth`, data).then(res => {
        cb(res);
    });
};
