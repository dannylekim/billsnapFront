import React from "react";
import "./styles.scss";
import {Button} from "shards-react";

export const StartBillButton = ({onClickHandler}) => {
    return (
        <Button size="sm" pill onClick={onClickHandler} className="startBill__button">Start Bill</Button>
    )
};

export default StartBillButton;
