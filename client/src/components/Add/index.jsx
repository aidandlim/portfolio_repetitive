import React, { useState, useEffect } from 'react';

import Type from '../Type';

import { post, getType } from '../../data';

import './index.css';

const Add = ({ login }) => {
    const [type, setType] = useState(0);
    const [isCloudMode, setIsCloudMode] = useState(false);

    useEffect(() => {
        if (!isCloudMode) document.form_add.english.focus();
    }, [type, isCloudMode]);

    let isProcessing = false;

    const _handleForm = e => {
        e.preventDefault();

        isProcessing = true;

        const form = document.form_add;
        const english = form.english;
        const korean = form.korean;

        if (!isProcessing && english.value !== '' && korean.value !== '') {
            post(login, getType(type), english.value, korean.value, res => {
                if (res.status === 200) {
                    english.value = '';
                    korean.value = '';
                    english.focus();
                } else {
                    alert('Error occured!');
                }
                isProcessing = true;
            });
        }
    };

    const _handleIsCloudMode = () => {
        setIsCloudMode(isCloudMode => !isCloudMode);
    };

    return (
        <div className='default'>
            <div className='default-container'>
                <Type type={type} setType={setType} />
                {isCloudMode ? (
                    <div className='default-wrapper'>
                        <div className='add-cloud-null'>It is under construction :(</div>
                        <button
                            className='add-cloud-button'
                            type='button'
                            onClick={_handleIsCloudMode}
                        >
                            BACK TO ADD MODE
                        </button>
                    </div>
                ) : (
                    <form name='form_add' onSubmit={_handleForm} autoComplete='off'>
                        <input
                            className='add-input'
                            type='text'
                            name='english'
                            placeholder='English'
                        />
                        <input
                            className='add-input'
                            type='text'
                            name='korean'
                            placeholder='Korean'
                        />
                        <button
                            className='add-cloud-button'
                            type='button'
                            onClick={_handleIsCloudMode}
                        >
                            ADD FROM CLOUD
                        </button>
                        <button className='add-button' type='submit'>
                            SAVE
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Add;
