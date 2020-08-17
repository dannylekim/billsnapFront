import React from "react";
import "./styles.scss";
import {MdThumbDown, MdThumbUp} from "react-icons/md";

export const PendingBillCard = ({
  acceptBillInvitationHandler,
  declineBillInvitationHandler,
  filterDateHandler,
  bill,
  activeBillId,
  getBillIconHandler,
}) => {
  const thumbUpColor = "#47e5b6";
  const thumbDownColor = "#000000";
  return (
    <div
      className={activeBillId === bill.id ? "active__bill card-body" : "non__active__bill card-body"}
    >
      <div className="split__info">
        <div />
        <div className="date">{filterDateHandler(bill.created)}</div>
      </div>
      <div className="bill__items">
        <div className="split__info">
          <div className="separate__right bill-icon">
            {getBillIconHandler(bill.category)}
          </div>
          <div className="bill__name">
            <div>{bill.name}</div>
            <div className="responsible">
              Split by : {bill.responsible.firstName}
            </div>
          </div>
        </div>
        <div className="money__info">
          <div className="split__info">
            <div> Bill Total </div>
            <div> {parseFloat(bill.balance).toFixed(2)} </div>
          </div>
          <div className="split__info">
            <div className="separate-right">You will owe </div>
            <div className="bill-balance">{bill.amountOwed}</div>
          </div>

          <div className="split__info">
            <div> Accept? </div>
            <div>
              <MdThumbUp
                color={thumbUpColor}
                size={20}
                onClick={acceptBillInvitationHandler}
              />
            </div>
            <div>
              <MdThumbDown
                color={thumbDownColor}
                size={20}
                onClick={declineBillInvitationHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
