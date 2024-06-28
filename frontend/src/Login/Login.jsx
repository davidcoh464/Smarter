import React, { useState } from 'react';
import './loginStyle.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const moveToSignup = () => {
        // Logic to navigate to the signup page or open a signup modal
        console.log('Move to signup');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // Add your login logic here
    };

    return (
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

                    <div className="form-group"> <input type="submit" value="Login" /> </div>
                </form>

                <div className="signup"><p onClick={moveToSignup}>Sign up</p></div>
            </div>
        </div>
    );
}

export default Login;
