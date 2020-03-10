import React, { useEffect } from 'react';

import { auth } from '../../data';

import './index.css';

const Auth = ({ setLogin }) => {
    useEffect(() => {
        document.form_auth.username.focus();
    }, []);

    const _handleForm = e => {
        e.preventDefault();

        const form = document.form_auth;
        const username = form.username.value;
        const password = form.password.value;

        auth(username, password, (res) => {
            if(res.data === 200) {
                setLogin(username);
            } else {
                alert('User information is not correct :(');
            }
        });
    };

    return (
        <div className='auth'>
            <div className='auth-container'>
                <div className='auth-title'>REPETITIVE</div>
                <form name='form_auth' onSubmit={_handleForm} autoComplete='off'>
                    <label className='auth-label'>
                        <p className='auth-p'>USERNAME</p>
                        <input className='auth-input' type='text' name='username' required />
                    </label>
                    <label className='auth-label'>
                        <p className='auth-p'>PASSWORD</p>
                        <input className='auth-input' type='password' name='password' required />
                    </label>
                    <button className='auth-button' type='submit'>
                        Get Started
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
