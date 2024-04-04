import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
    const [isActive, setIsActive] = useState(false);

    const handleLoginClick = () => {
        setIsActive(false);
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
        <div className={`${styles.container} ${isActive ? styles.active : ''}`} id="container">
            <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
                <form>
                    <h1>Create Account</h1>
                    <div className={styles["social-icons"]}>
                        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
                <form>
                    <h1>Sign In</h1>
                    <div className={styles["social-icons"]}>
                        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div>
                    <span>or use your email password</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="/">Forget Your Password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className={styles["toggle-container"]}>
                <div className={styles.toggle}>
                    <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className={styles.hidden} id="login" onClick={handleLoginClick}>Sign In</button>
                    </div>
                    <div className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}>
                        <h1>Hello!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className={styles.hidden} id="register">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
