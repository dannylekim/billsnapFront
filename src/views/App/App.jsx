import React from 'react';
/**
 * Load you page components here. We will render them via routes
 */
// import LoginPage from '../Login/Login';
import RegisterPage from '../Register/Register';
import { Logo } from '../../components/Logo/Logo.jsx';


import './styles.scss';

export default (props) => {
    const appName = process.env.REACT_APP_NAME;

    return (
        <div className="App">
            <header className="App-header">
                <a className="header-name" href="/">{appName}</a>
                <div className="App-logo">
                    <Logo />
                </div>
            </header>
            <RegisterPage/>
        </div>
    );
}
