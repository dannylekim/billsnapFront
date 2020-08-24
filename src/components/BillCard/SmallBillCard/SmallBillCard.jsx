import React from "react";
import PropType from "prop-types";

import {filterDateTime} from '../../../helpers/DateTime';
import "./styles.scss";
import BillIcon from "../../BillIcon";

const SmallBillCard = ({ activeBillId, bill }) => (
  <div
    className={`bill__items card-body ${(typeof activeBillId === 'number' && activeBillId === bill.id) && 'bill-active' }`}
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
      <div id="bill__icon">
        <BillIcon category={bill.category} />
      </div>
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
  bill: PropType.shape({}), // array of bill object
  activeBillId: PropType.number // bill selected
}

export default SmallBillCard;
