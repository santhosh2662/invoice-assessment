import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SignUpPage from '../SignUpPage';

import './index.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                navigate('/signup');
            }
        } catch (error) {
            navigate('/home');
        }
    };

    const onSignupPage = () => {
        return (
        <div>
            <SignUpPage />
        </div>)
    }

    return (
        <div className='login-container'>
            <h1 className='login-header'>Login</h1>
            <form onSubmit={handleLogin}>
                <div className='input-container'>
                    <label htmlFor='email' className='email'>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} id = 'email' />
                </div>
                <div className='input-container'>
                    <label htmlFor='password' className = 'password'>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} id = 'password' />
                </div>
                <button type='submit' className='login-button'>Login</button>
            </form>
            <button type='click' className='new-user' onClick={onSignupPage}>New Registration</button>
        </div>
    )
}

export default LoginPage;