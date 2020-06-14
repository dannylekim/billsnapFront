import React from 'react';
import NavbarLayer from '../NavbarLayer';
import LandingPage from '../LandingPage/LandingPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './styles.scss';
/**
 * Load you page components here. We will render them via routes
 */

export default (props) => {
    return (
        <div className="App">
            <NavbarLayer/>
            {/*<RegisterPage />*/}
            {/*<header className="App-header">*/}
            {/*  /!*<a className="header-name" href= "/">{appName}</a>*!/*/}
            {/*</header>*/}
            <BrowserRouter>
                <Switch>
                    <React.Fragment>
                        <div className="App__container">
                            <Route path="/" exact component={LandingPage}/>
                            <Route path="/dashboard" exact/>
                        </div>
                    </React.Fragment>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
