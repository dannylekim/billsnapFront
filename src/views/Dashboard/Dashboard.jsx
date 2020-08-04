import React from "react";
import Sidebar from "../../components/Sidebar";
import BillDisplay from "../BillDisplay";
import "./styles.scss";

export default (props) => {
    return (
        <div>
            {localStorage.getItem("billSnap_token") ? (
                <div className="dashboard__flexbox">
                    <div className="side__bar">
                        <Sidebar/>
                    </div>
                    <div className="bill__display">
                        <BillDisplay/>
                    </div>
                </div>
            ) : (
                props.history.push("/")
            )}
        </div>
    );
};
