import React from "react";
/**
 * Load you page components here. We will render them via routes
 */
import LandingPage from "../LandingPage";
import Dashboard from "../Dashboard";
import Profile from "../Profile";
import Sidebar from "../../components/Sidebar";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import BillSnapBackground from "../Background";
import "./styles.scss";

/**
 * Load you page components here. We will render them via routes
 */

export default ({hasUser}) => {
  
  return (
    <div className='App'>
      <BillSnapBackground showWave />
      <BrowserRouter>
        <Switch>
          <React.Fragment>
            <div className='App__container'>
              {hasUser === true && <Sidebar />}
              <Route path='/' exact component={LandingPage} />
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/profile' exact component={Profile} />
            </div>
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
