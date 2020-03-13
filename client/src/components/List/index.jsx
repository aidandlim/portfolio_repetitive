import React, { useState, useEffect } from 'react';

import Type from '../Type';
import PublicToggle from '../PublicToggle';

import { get, update, remove, getType } from '../../data';

import FeatherIcons from 'feather-icons-react';

import './index.css';

const List = ({ login }) => {
    const [type, setType] = useState(0);
    const [list, setList] = useState([]);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        setList([]);
        setIsDone(false);

        get(login, getType(type), res => {
            setList(res.data);
            setIsDone(true);
        });
    }, [login, type]);

    const _handleUpdate = index => {
        const english = prompt('Update English', list[index].english);
        if (english === null) return;
        const korean = prompt('Update Korean', list[index].korean);
        if (korean === null) return;

        update(login, getType(type), list[index].id, english, korean, res => {
            setList(res.data);
        });
    };

    const _handleDelete = id => {
        remove(login, getType(type), id, res => {
            if (res.status === 200) {
                setList(res.data);
            }
        });
    };

    return (
        <div className='default'>
            <div className='default-container'>
                <Type type={type} setType={setType} />
                <PublicToggle login={login} type={type} />
                {list.length !== 0 ? (
                    list.map((data, index) => (
                        <div className='list-element' key={index}>
                            <FeatherIcons
                                className='list-element-icon-update'
                                icon='edit'
                                onClick={() => _handleUpdate(index)}
                            />
                            <div>{data.english}</div>
                            <div>{data.korean}</div>
                            <FeatherIcons
                                className='list-element-icon-delete'
                                icon='x-circle'
                                onClick={() => _handleDelete(data.id)}
                            />
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
