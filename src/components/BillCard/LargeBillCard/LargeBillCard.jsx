import React from "react";
import "./styles.scss";

const LargeBillCard = ({ selectedBill }) => (
  <div className="large__bill">
    {`Bill #  ${
      selectedBill.bill !== null
        ? selectedBill.id + " " + selectedBill.bill.name
        : ""
    }`}
    <div className="inner__bill_container"></div>
  </div>
);
export default LargeBillCard;
