import React from 'react';

import Wrapper from 'react-div-100vh';

import Header from '../Header';
import Body from '../Body';

import './index.css';

const App = () => {
    return (
        <Wrapper className='no-drag'>
            <div className='app'>
                <Header />
                <Body />
            </div>
        </Wrapper>
    );
};

export default App;
