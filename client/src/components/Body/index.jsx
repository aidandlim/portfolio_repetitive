import React, { useState } from 'react';

import Mode from '../Mode';
import Add from '../Add';
import List from '../List';
import Drill from '../Drill';

import './index.css';

const Body = ({ login }) => {
    const [mode, setMode] = useState(0);

    return (
        <div className='body'>
            <Mode mode={mode} setMode={setMode} />
            {mode === 0 ? <Add login={login}/> : null}
            {mode === 1 ? <List login={login} /> : null}
            {mode === 2 ? <Drill login={login} setMode={setMode} /> : null}
        </div>
    );
};

export default Body;
