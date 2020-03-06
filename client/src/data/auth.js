import axios from 'axios';

export const auth = (username, password, cb) => {
    const data = {
        username,
        password
    };

    axios.post(`/api/auth`, data).then(res => {
        cb(res);
    });
};
