import React, { useState, useEffect } from 'react';

import Type from '../Type';

import { post, getType } from '../../data';

import './index.css';

const Add = ({ login }) => {
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
            post(login.username, getType(type), english.value, korean.value, res => {
                if (res.status === 200) {
                    english.value = '';
                    korean.value = '';
                    english.focus();
                } else {
                    alert('Error occured!');
                }
            });
        }
    };

    return (
        <div className='default'>
            <div className='default-container'>
                <Type type={type} setType={setType} />
                <form name='form_add' onSubmit={_handleForm} autoComplete='off'>
                    <input className='add-input' type='text' name='english' placeholder='English' />
                    <input className='add-input' type='text' name='korean' placeholder='Korean' />
                    <button className='add-button' type='submit'>SAVE</button>
                </form>
            </div>
        </div>
    );
};

export default Add;
