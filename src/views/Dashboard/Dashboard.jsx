import React, {Component} from "react";
import Sidebar from "../../components/Sidebar";
import {DEFAULT_ACTIVE_STATE} from "../../components/Sidebar/Sidebar.jsx";
import BillDisplay from "../BillDisplay";
import Profile from "../Profile";
import "./styles.scss";

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeState:  {
        ...DEFAULT_ACTIVE_STATE,
        bills: true
      },
      component: <BillDisplay />
    };
    this.setActiveState = this.setActiveState.bind(this);
    this.setComponent = this.setComponent.bind(this);
    this.filterComponentFromNav = this.filterComponentFromNav.bind(this);
  };

  setActiveState = activeState => this.setState({activeState});
  setComponent = component => this.setState({component});
  filterComponentFromNav = (navType) => {
    const filterKeyVal = {
      "bills" : <BillDisplay/>,
      "profile" : <Profile userInfo={this.props.userInfo}/>, 
      "contacts": <div> Contacts </div>,
      "settings": <div> Settings </div>,
      "help": <div> Help </div>
    };
    this.setComponent(filterKeyVal[navType]);
  };

  render = () => {
 
    const {activeState, component} = this.state;

    return (
      <div className="dashboard__flexbox">
        {localStorage.getItem("billSnap_token") ? (
          <div className="dashboard__flexbox">
            <div className="side__bar">
              <Sidebar activeState={activeState} setActiveState={this.setActiveState} filterComponentFromNav={this.filterComponentFromNav}/>
            </div>
            <div className="dashboard__content">
                {component}
            </div>
          </div>
        ) : (
          this.props.history.push("/")
        )}
      </div>
    );
  };
};
