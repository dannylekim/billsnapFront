import React from "react";
import {Button, FormInput} from "shards-react";
import "./styles.scss";

export default ({
  payBillHandler,
  onChangeHandler,
  billName,
  amountRemainingToPay,
}) => (
  <div>
    <div className="split-info text__information">
      <div>Bill Name</div>
      <div>{billName}</div>
    </div>
    <div className="split-info text__information">
      <div>Amount left to pay</div>
      <FormInput
          name={"amountRemaining"}
          value={amountRemainingToPay}
          onChange={onChangeHandler}
          className="small-input"
          step="0.01"
          type="number"
      />
    </div>
    <div className="split-info">
      <div />
      <Button
        outline
        pill
        theme="success"
        className="pay-button"
        onClick={payBillHandler}
      >
        Pay Bill
      </Button>
    </div>
  </div>
);
