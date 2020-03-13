import React, { useState, useEffect } from 'react';

import { getAuth, putAuth } from '../../data';

import './index.css';

const PublicToggle = ({ login, type }) => {
    const [user, setUser] = useState({
        id: -1
    });

    useEffect(() => {
        getAuth(login, res => {
            setUser(res.data);
        });
    }, [login]);

    const _handlePublic = () => {
        putAuth(login, type, res => {
            setUser(res.data);
        });
    };

    return (
        <div className='publicToggle-container'>
            <div className='publicToggle-title'>DO YOU WANT TO MAKE IT PUBLIC?</div>
            <div
                className={
                    (type === 0 && user.id !== -1 && user.isPublicPatterns === true) ||
                    (type === 1 && user.id !== -1 && user.isPublicChunks === true)
                        ? 'publicToggle-toggle-active'
                        : 'publicToggle-toggle'
                }
                onClick={_handlePublic}
            >
                <div
                    className={
                        (type === 0 && user.id !== -1 && user.isPublicPatterns === true) ||
                        (type === 1 && user.id !== -1 && user.isPublicChunks === true)
                            ? 'publicToggle-toggle-button-active'
                            : 'publicToggle-toggle-button'
                    }
                ></div>
            </div>
        </div>
    );
};

export default PublicToggle;
