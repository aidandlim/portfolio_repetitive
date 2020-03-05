import React, { useState } from 'react';

import Type from '../Type';

import { postPatterns, postChunksVerb, postChunksAdverb } from '../../data';

import './index.css';

const Add = () => {
    const [type, setType] = useState(0);

    const _handleForm = e => {
        e.preventDefault();

        const form = document.form_add;
        const english = form.english;
        const korean = form.korean;

        if (english.value !== '' && korean.value !== '') {
            let func;

            if (type === 0) func = postPatterns;
            if (type === 1) func = postChunksVerb;
            if (type === 2) func = postChunksAdverb;

            func(english.value, korean.value, res => {
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
