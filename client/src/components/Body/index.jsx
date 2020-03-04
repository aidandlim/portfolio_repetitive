import React, { useState } from 'react';

import Mode from '../Mode';
import Update from '../Update';
import Drill from '../Drill';

import './index.css';

const Body = () => {
    const [mode, setMode] = useState(0);

    return (
        <div className='body'>
            <Mode mode={mode} setMode={setMode} />
            {mode === 0 ? <Update /> : <Drill />}
        </div>
    );
};

export default Body;
