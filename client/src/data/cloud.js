import axios from 'axios';

export const getCloud = (username, type, cb) => {
    axios.get(`/api/cloud/${username}/${type}`).then(res => {
        cb(res);
    });
};