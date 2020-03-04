import React from 'react';

import './index.css';

const Mode = ({ mode, setMode }) => {
    return (
        <div className='mode'>
            <div className='mode-button-container'>
                <button
                    className={mode === 0 ? 'mode-button-active' : 'mode-button'}
                    onClick={() => setMode(0)}
                >
                    UPDATE
                </button>
                <button
                    className={mode === 1 ? 'mode-button-active' : 'mode-button'}
                    onClick={() => setMode(1)}
                >
                    DRILL
                </button>
            </div>
        </div>
    );
};

export default Mode;
