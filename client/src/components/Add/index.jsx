import React, { useState, useEffect } from 'react';

import Type from '../Type';

import { post, getType } from '../../data';

import './index.css';

const Add = () => {
    const [type, setType] = useState(0);

    useEffect(() => {
        document.form_add.english.focus();
    }, [type]);

    const _handleForm = e => {
        e.preventDefault();

        const form = document.form_add;
        const english = form.english;
        const korean = form.korean;

        if (english.value !== '' && korean.value !== '') {
            post(getType(type), english.value, korean.value, res => {
                if (res.status === 200) {
                    english.value = '';
                    english.focus();
                    korean.value = '';
                } else {
                    alert('Error occured!');
                }
            });
        }
    };

    return (
        <div className='add'>
            <div className='add-container'>
                <Type type={type} setType={setType} />
                <form name='form_add' onSubmit={_handleForm} autoComplete='off'>
                    <input type='text' name='english' placeholder='English' />
                    <input type='text' name='korean' placeholder='Korean' />
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    );
};

export default Add;
