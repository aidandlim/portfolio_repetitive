import React, { useState } from 'react';

import Wrapper from 'react-div-100vh';

import Header from '../Header';
import Auth from '../Auth';
import Body from '../Body';

import './index.css';

const App = () => {
    const [login, setLogin] = useState('');

    return (
        <Wrapper className='no-drag'>
            <div className='app'>
                <Header setLogin={setLogin} />
                {login !== '' ? <Body login={login} /> : <Auth setLogin={setLogin} />}
            </div>
        </Wrapper>
    );
};

export default App;
