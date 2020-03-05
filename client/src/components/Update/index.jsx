import React, { useState, useEffect } from 'react';

import {
    getPatterns,
    getChunks,
    postPatterns,
    postChunks,
    deletePatterns,
    deleteChunks
} from '../../data';

import './index.css';

const Update = () => {
    const [type, setType] = useState(0);
    const [patterns, setPatterns] = useState([]);
    const [chunks, setChunks] = useState([]);

    useEffect(() => {
        getPatterns(res => {
            setPatterns(res.data);
        });
        getChunks(res => {
            setChunks(res.data);
        });
    }, []);

    const _handleForm = e => {
        e.preventDefault();

        const form = document.update;
        const english = form.english;
        const korean = form.korean;

        if (english.value !== '' && korean.value !== '') {
            const func = type ? postChunks : postPatterns;

            func(english.value, korean.value, res => {
                if (res.status === 200) {
                    const setter = type ? setChunks : setPatterns;

                    setter(value => [...value, res.data]);
                    english.value = '';
                    korean.value = '';

                    english.focus();
                }
            });
        }
    };

    const _handleDelete = id => {
        const func = type ? deleteChunks : deletePatterns;

        func(id, res => {
            if (res.status === 200) {
                const setter = type ? setChunks : setPatterns;

                setter(array => {
                    console.log(array.findIndex(element => +element.id === +id));
                    // return array.splice(array.findIndex(element => +element.id === +id))
                });
            }
        });
    };

    return (
        <div className='update'>
            <div className='update-type-container'>
                <button
                    className={type === 0 ? 'update-type-active' : 'update-type'}
                    onClick={() => setType(0)}
                >
                    PATTERN
                </button>
                <button
                    className={type === 1 ? 'update-type-active' : 'update-type'}
                    onClick={() => setType(1)}
                >
                    CHUNK
                </button>
            </div>
            <form name='update' onSubmit={_handleForm} autoComplete='off'>
                <input type='text' name='english' placeholder='English' />
                <input type='text' name='korean' placeholder='Korean' />
                <button type='submit'>Save</button>
            </form>
            <div className='update-list-container'>
                {type
                    ? chunks.map((data, index) => (
                          <div className='update-list' key={index}>
                              <div>{data.english}</div>
                              <div>{data.korean}</div>
                              <button
                                  className='update-list-delete'
                                  onClick={() => _handleDelete(data.id)}
                              >
                                  delete
                              </button>
                          </div>
                      ))
                    : patterns.map((data, index) => (
                          <div className='update-list' key={index}>
                              <div>{data.english}</div>
                              <div>{data.korean}</div>
                              <button
                                  className='update-list-delete'
                                  onClick={() => _handleDelete(data.id)}
                              >
                                  delete
                              </button>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Update;
