import React from 'react';

import './index.css';

const Header = () => {
    return (
        <div className='header'>
            <div className='header-title' onClick={() => window.open('/', '_self')}>REPETITIVE</div>
        </div>
    );
};

export default Header;
