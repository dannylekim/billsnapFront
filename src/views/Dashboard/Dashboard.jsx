import React, {useState} from "react";
import Sidebar from "../../components/Sidebar";
import {DEFAULT_ACTIVE_STATE} from "../../components/Sidebar/Sidebar.jsx";
import BillDisplay from "../BillDisplay";
import "./styles.scss";

export default ({history,userInfo}) => {
  //testing with @testing-library to be learnt later
  const [activeState, setActiveState] = useState(
                                                {
                                                  ...DEFAULT_ACTIVE_STATE,
                                                  bills: true
                                                }
                                              );
  const [component, setComponent] = useState(<BillDisplay />);

  const filterComponentFromNav = (navType) => {
    const filterKeyVal = {
      "bills" : <BillDisplay/>,
      "profile" : <div> Profile <p> {JSON.stringify(userInfo)} </p> </div>, //temporary please allow
      "contacts": <div> Contacts </div>,
      "settings": <div> Settings </div>,
      "help": <div> Help </div>
    };
    setComponent(filterKeyVal[navType]);
  };
  
  return (
    <div>
      {localStorage.getItem("billSnap_token") ? (
        <div className="dashboard__flexbox">
          <div className="side__bar">
            <Sidebar activeState={activeState} setActiveState={setActiveState} filterComponentFromNav={filterComponentFromNav}/>
          </div>
          <div className="dashboard__content">
              {component}
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </div>
  );
};
