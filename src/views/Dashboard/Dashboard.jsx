import React, {useState} from "react";
import Sidebar from "../../components/Sidebar";
import {DEFAULT_ACTIVE_STATE} from "../../components/Sidebar/Sidebar.jsx";
import BillDisplay from "../BillDisplay";
import "./styles.scss";

export default (props) => {

  const [activeState, setActiveState] = useState(
                                                {
                                                  ...DEFAULT_ACTIVE_STATE,
                                                  bills: true
                                                }
                                              );
  const [component, setComponent] = useState(<BillDisplay />);

  return (
    <div>
      {localStorage.getItem("billSnap_token") ? (
        <div className="dashboard__flexbox">
          <div className="side__bar">
            <Sidebar activeState={activeState} setActiveState={setActiveState} setComponent={setComponent}/>
          </div>
          <div className="dashboard__content">
              {component}
          </div>
        </div>
      ) : (
        props.history.push("/")
      )}
    </div>
  );
};
