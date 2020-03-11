import React from 'react';

import cookie from 'react-cookies';

import './index.css';

const Header = ({ setLogin }) => {
    const _handleSignOut = () => {
        cookie.remove('login', { path: '/' });
        setLogin('');
    };

    return (
        <div className='header'>
            <div className='header-title'>REPETITIVE</div>
            <div className='header-signout' onClick={_handleSignOut}>
                SIGN OUT
            </div>
        </div>
    );
};

export default Header;
