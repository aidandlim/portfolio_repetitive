import React, { useState, useEffect } from 'react';

import Type from '../Type';

import { post, getType, getCloud } from '../../data';

import './index.css';

const Add = ({ login }) => {
    const [type, setType] = useState(0);
    const [isCloudMode, setIsCloudMode] = useState(false);
    const [cloudList, setCloudList] = useState([]);

    useEffect(() => {
        if (!isCloudMode) {
            document.form_add.english.focus();
        } else {
            getCloud(login, getType(type), res => {
                setCloudList(res.data);
            });
        }
    }, [login, type, isCloudMode]);

    let isProcessing = false;

    const _handleForm = e => {
        e.preventDefault();

        const form = document.form_add;
        const english = form.english;
        const korean = form.korean;

        if (!isProcessing && english.value !== '' && korean.value !== '') {
            isProcessing = true;
            post(login, getType(type), english.value, korean.value, res => {
                if (res.status === 200) {
                    english.value = '';
                    korean.value = '';
                    english.focus();
                } else {
                    alert('Error occured!');
                }
                isProcessing = false;
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
                        {cloudList.length === 0 ? (
                            <div className='add-cloud-null'>There is no cloud list :(</div>
                        ) : (
                            cloudList.map((element, index) => <div className='add-cloud-list' key={index}>{element.username}'s {getType(type)} list.</div>)
                            
                        )}
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
