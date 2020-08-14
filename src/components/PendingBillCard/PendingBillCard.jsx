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
      className="bill__items card-body"
      id={activeBillId === bill.id ? "active__bill" : "non__active__bill"}
    >
      {bill.created && (
        <div className="bill__items card-title text-muted">
          <div className="float-right" id="bill__created">
            {filterDateHandler(bill.created)}
          </div>
        </div>
      )}
      <div className="bill__items card-text">
        <div>
          <div id="bill__icon">{getBillIconHandler(bill.category)}</div>
          <div className="bill__name__price">
            <div>
              <div id="bill__name">{bill.name}</div>
              <br />
              {bill.responsible && (
                <div id="responsible">
                  Split by : {bill.responsible.firstName}
                </div>
              )}
            </div>
          </div>
          <div className="bill__balance">
            <div className="split_info">
              <div> Bill Total </div>
              <div> {parseFloat(bill.balance).toFixed(2)} </div>
            </div>
            <div className="split_info">
              <div>You will owe </div>
              <div>{bill.balance}</div>
            </div>

            <div className="split_info">
              <div> Accept? </div>
              <div>
                <MdThumbUp
                  color={thumbUpColor}
                  onClick={acceptBillInvitationHandler}
                />
              </div>
              <div>
                <MdThumbDown
                  color={thumbDownColor}
                  onClick={declineBillInvitationHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
