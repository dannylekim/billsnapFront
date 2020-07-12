import React from "react";
import BillDisplay from "../BillDisplay";
import "./styles.scss";
import Sidebar from "../../components/Sidebar";

export default props => {
    return (
        <div>
            <Sidebar/>
            <BillDisplay/>
        </div>
    )
}