import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';  // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3002/login', { email, password })
            .then(result => {
                console.log(result);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userId', result.data.userId);
                localStorage.setItem('token', result.data.token);
                navigate('/home');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="login-title">Login</h1>
                <input
                    type='email'
                    placeholder='E-mail'
                    name='email'
                    className='input'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='input'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type='submit'
                    value='Login'
                    className="login-btn"
                />
            </form>
            <p>Don't have an account? <a href='/signup'>Signup</a></p>
        </div>
    );
};

export default Login;
