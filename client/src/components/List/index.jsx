import React, { useState, useEffect } from 'react';

import Type from '../Type';

import { get, remove, getType } from '../../data';

import './index.css';

const List = () => {
    const [type, setType] = useState(0);
    const [list, setList] = useState([]);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        setList([]);
        setIsDone(false);

        get(getType(type), res => {
            setList(res.data);
            setIsDone(true);
        });
    }, [type]);

    const _handleDelete = id => {
        remove(getType(type), id, res => {
            if (res.status === 200) {
                setList(res.data);
            }
        });
    };

    return (
        <div className='list'>
            <div className='list-container'>
                <Type type={type} setType={setType} />
                {list.length !== 0 ? (
                    list.map((data, index) => (
                        <div className='list-element' key={index}>
                            <div>{data.english}</div>
                            <div>{data.korean}</div>
                            <button
                                className='list-element-delete'
                                onClick={() => _handleDelete(data.id)}
                            >
                                X
                            </button>
                        </div>
                    ))
                ) : (
                    <div className='list-null'>{isDone ? 'There is no data :(' : 'Loading...'}</div>
                )}
            </div>
        </div>
    );
};

export default List;
