import React from 'react';

import './index.css';

const Type = ({ type, setType }) => {
    return (
        <div className='type'>
            <button
                className={type === 0 ? 'type-element-active' : 'type-element'}
                onClick={() => setType(0)}
            >
                PATTERNS
            </button>
            <button
                className={type === 1 ? 'type-element-active' : 'type-element'}
                onClick={() => setType(1)}
            >
                MAIN CHUNKS
            </button>
            <button
                className={type === 2 ? 'type-element-active' : 'type-element'}
                onClick={() => setType(2)}
            >
                EXTRA CHUNKS
            </button>
        </div>
    );
};

export default Type;
