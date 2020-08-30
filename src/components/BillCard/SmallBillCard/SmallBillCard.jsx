import React from "react";
import "./styles.scss";
import {filterDateTime} from "../../../helpers/DateTime";
import BillIcon from "../../BillIcon";
import PropType from "prop-types";

const SmallBillCard = ({ bill, activeBillId }) => {
  return (
    <div
      className={
        activeBillId === bill.id
          ? "bill-active card-body"
          : "non__active__bill card-body"
      }
    >
      <div className="split__info">
        <div />
        <div className="date">{filterDateTime(bill.created)}</div>
      </div>
      <div className="bill__items">
        <div className="split__info">
          <div className="separate-right bill-icon">
            <BillIcon category={bill.category} />
          </div>
          <div className="bill_name text__format">
            <div>{bill.name}</div>
            <div className="responsible">
              Split by : {bill.responsible.firstName}
            </div>
          </div>
        </div>
        <div className="bill_balance text__format">{bill.balance}$</div>
      </div>
    </div>
  );
};

SmallBillCard.propTypes = {
  bill: PropType.shape({}), // array of bill object
  activeBillId: PropType.number, // bill selected
};

export default SmallBillCard;
