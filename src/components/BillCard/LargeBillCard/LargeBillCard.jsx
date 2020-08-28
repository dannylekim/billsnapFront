import React from "react";
import "./styles.scss";
import {Card} from "shards-react";

const LargeBillCard = ({ selectedBill }) => (
  <Card className="large__bill">
    <div className="inner__bill__dimensions">
      <div className="split_between space-top">
        <div>Bill # {selectedBill.id}</div>
        <div className="bill_name">{selectedBill.name}</div>
      </div>
      <div className="inner__bill_container">
        <div className="split_between">
          <div />
          <div>{selectedBill.created}</div>
        </div>
        <div className="split_between">
          <div />
          <div>
            Category: {selectedBill.category ? selectedBill.category : "None"}
          </div>
        </div>
      </div>
    </div>
  </Card>
);
export default LargeBillCard;
