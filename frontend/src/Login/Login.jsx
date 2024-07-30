import React, { useState } from 'react';
import './Login.css';
import Signup from './Signup';
import { userLogin } from '../Api/UtilsService';

function Login({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const moveToSignup = () => {
        console.log('Move to signup');
        setIsSignup(true); // Change to true to show the signup form
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        userLogin(formData.email, formData.password)
            .then((data) => {
                console.log(data);
                localStorage.setItem('user_id', data._id);
                setIsLoggedIn(true);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            {!isSignup ? (
                <div className="container_1">
                    <div className="container_2">
                        <h2>Login</h2>
                        <form id="login-form" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email"
                                    value={formData.email} onChange={handleChange} required autoComplete="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" placeholder="Enter your password"
                                    value={formData.password} onChange={handleChange} required autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Login" />
                            </div>
                        </form>
                        <div className="signup">
                            <p onClick={moveToSignup}>Sign up</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='signup-class'>
                    <Signup setIsSignup={setIsSignup} />
                </div>
            )}
        </>
    );
}

export default Login;
