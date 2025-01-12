import React, {useState} from 'react';

import './index.css';

function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (event) =>{
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password}),
            });
            const data = await response.JSON()
            if (response.ok) {
                alert('User registered successfully')
            }
            else {
                alert(data.message)
            }
        }
        catch (error) {
            alert('Error signing up')
        }
    };
    
    return (
        <div className='signup-contaoiner'>
            <h1 className='signup-heading'>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div className='input-container'>
                    <label className='label' htmlFor='name'>Name:</label>
                    <input type='text' id = 'name' className='form-control' onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='sign-email'>Email:</label>
                    <input type='text' id = 'sign-email' className='form-control' onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='sign-password'>Password:</label>
                    <input type='password' id = 'sign-password' className='form-control' onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type='submit' className='login-button'>Sign Up</button>
            </form>
        </div>
    )
};

export default SignUpPage;