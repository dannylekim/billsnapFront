import React, {useEffect} from "react";
/**
 * Load you page components here. We will render them via routes
 */
import LandingPage from "../LandingPage";
import Dashboard from "../Dashboard";
import Profile from "../Profile";
import Sidebar from "../../components/Sidebar";

import {BrowserRouter, Route, Switch} from "react-router-dom";
import BillSnapBackground from "../Background";
import "./styles.scss";
import {isExpired} from "../../helpers/JwtHelper";

/**
 * Load you page components here. We will render them via routes
 */

export default ({ getUser, isLoggedIn }) => {
  useEffect(() => {
    const token = localStorage.getItem("billSnap_token");
    if (token) {
      if (!isExpired(token)) {
        getUser();
      } else {
        localStorage.removeItem("billSnap_token");
      }
    }
  });

  return (
    <div className="App">
      <BillSnapBackground showWave={!isLoggedIn} />
      <BrowserRouter>
        <Switch>
          <React.Fragment>
            <div className="App__container">
              <Route path="/" exact component={LandingPage} />
              <Sidebar hide={!isLoggedIn} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/profile" exact component={Profile} />
            </div>
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
