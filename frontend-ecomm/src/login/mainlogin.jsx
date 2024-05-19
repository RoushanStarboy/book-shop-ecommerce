import React, { useEffect, useState } from "react";
import axios from 'axios';  // Import axios for HTTP requests
import "./LoginPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pass1: '',
        pass2: ''
    }); // setting up form

    const [message, setMessage] = useState('');  // State for feedback messages

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle signup form submission
    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.post('http://127.0.0.1:8000/authentication/signup/', formData, {
                headers: {
                    'Content-Type': 'application/json' // Set content type to JSON
                }
            });
            setMessage(response.data.success);   // Display success message
        } catch (error) {
            if (error.response) {
                // Request made and server responded with a status code out of the range of 2xx
                setMessage(error.response.data.error);
            } else if (error.request) {
                // The request was made but no response was received
                setMessage('No response received from the server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    // Handle login form submission
    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/authentication/login/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data.success);
            // Redirect to homepage
            window.location.href = '/';
        } catch (error) {
            if (error.response) {
                // Request made and server responded with a status code out of the range of 2xx
                setMessage(error.response.data.error);
            } else if (error.request) {
                // The request was made but no response was received
                setMessage('No response received from the server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleRegisterClick = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');
        
        const handleRegisterClick = () => {
            setIsActive(!isActive); // Toggle isActive state
        };
        
        registerBtn.addEventListener('click', handleRegisterClick);
        loginBtn.addEventListener('click', handleLoginClick);
        
        // Cleanup event listeners
        return () => {
            registerBtn.removeEventListener('click', handleRegisterClick);
        };
    }, [isActive]);

    return (
        <div className={`container ${isActive ? 'active' : ''}`} id="container">
            <div className={`form-container sign-up`}>
                <form onSubmit={handleSignup}>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="/" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        <a href="/" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="/" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="/" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                    <input type="password" placeholder="Password" name="pass1" onChange={handleChange} />
                    <input type="password" placeholder="Confirm Password" name="pass2" onChange={handleChange} />
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p>{message}</p>} {/* display message */}
            </div>
            <div className={`form-container sign-in`}>
                <form onSubmit={handleLogIn}>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="/" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        <a href="/" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="/" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="/" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div>
                    <span>or use your email password</span>
                    <input type="text" placeholder="Name" name="name" onChange={handleChange} />  {/* Changed from email to name */}
                    <input type="password" placeholder="Password" name="pass1" onChange={handleChange} />
                    <a href="/">Forget Your Password?</a>
                    <button type="submit">Sign In</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className={`toggle-panel toggle-left`}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
                    </div>
                    <div className={`toggle-panel toggle-right`}>
                        <h1>Hello!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
