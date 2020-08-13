import React from "react";
import PropType from "prop-types";
import {FaBus, FaCar, FaQuestion, FaShoppingBag, FaShoppingCart, FaUtensils } from "react-icons/fa";

import { filterDateTime } from '../../../helpers/DateTime';

import "./styles.scss";

const getBillIcons = (category) => {
  const color = "rgba(0, 0, 0, 0.96)";
  switch (category) {
    case "food":
      return <FaUtensils color={color} size={24} />;
    case "transport":
      return <FaCar color={color} size={24} />;
    case "public-transport":
      return <FaBus color={color} size={24} />;
    case "grocery":
      return <FaShoppingCart color={color} size={24} />;
    case "shopping":
      return <FaShoppingBag color={color} size={24} />;
    default:
      return <FaQuestion color={color} size={24} />;
  }
};

const SmallBillCard = ({ activeBill, bill }) => (
  <div
    className="bill__items card-body"
    id={
      activeBill && activeBill.id === bill.id
        ? "active__bill"
        : "non__active__bill"
    }
  >
    {!!bill.created && (
      <div className="bill__items card-title text-muted">
        <span className="float-right" id="bill__created">
          {" "}
          {filterDateTime(bill.created)}
        </span>
      </div>
    )}
    <div className="bill__items card-text">
      <div id="bill__icon">{getBillIcons(bill.category)}</div>
      <div className="bill__name__price">
        <span id="bill__name">{bill.name} </span>
        <span id="bill__balance">
          {" "}
          {parseFloat(bill.balance).toFixed(2)} ${" "}
        </span>
      </div>
    </div>

    {bill.responsible && (
      <div className="bill__items split__by">
        <span id="responsible"> Split by : {bill.responsible.firstName} </span>
      </div>
    )}
  </div>
);

SmallBillCard.propTypes = {
  bill: PropType.arrayOf(PropType.shape({})), // array of bill object
  activeBill: PropType.shape({}) // bill selected
}

export default SmallBillCard;
