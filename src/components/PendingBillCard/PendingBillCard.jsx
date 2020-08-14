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
      className="card-body"
      id={activeBillId === bill.id ? "active_bill" : "non_active_bill"}
    >
      {bill.created && (
        <div className="split_info">
          <div />
          <div className="date">{filterDateHandler(bill.created)}</div>
        </div>
      )}
      <div className="bill_items">
        <div className="split_info">
          <div className="separate_right bill_icon">
            {getBillIconHandler(bill.category)}
          </div>
          <div className="bill_name">
            <div>{bill.name}</div>
            {bill.responsible && (
              <div className="responsible">
                Split by : {bill.responsible.firstName}
              </div>
            )}
          </div>
        </div>
        <div className="money_info">
          <div className="split_info">
            <div> Bill Total </div>
            <div> {parseFloat(bill.balance).toFixed(2)} </div>
          </div>
          <div className="split_info">
            <div className="separate_right">You will owe </div>
            <div className="bill_balance">{bill.balance}</div>
          </div>

          <div className="split_info">
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
