import React from "react";
import "./styles.scss";
import {Card, CardBody} from "shards-react";
import AccountStatusIcon from "../../AccountStatusIcon";
import ItemSplitContainer from "../../ItemSplitContainer";

function getItems(bill) {
  return (
    <>
      {bill.items.map((item) => (
        <div className="split_between embolden" key={item.id}>
          <div>
            <div className="split_between">
              <div className="sub_items_text">{item.name}</div>
              <ItemSplitContainer bill={bill} selectedItemId={item.id} />
            </div>

          </div>
          <div>{item.cost} $</div>
        </div>
      ))}
    </>
  );
}

const LargeBillCard = ({ bill }) => {
  const itemCost = bill.items
    .map((item) => item.cost)
    .map((cost) => parseFloat(cost))
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  return (
    <Card className="large__bill">
      <div className="inner__bill__dimensions">
        <div className="split_between space-top">
          <div>Bill # {bill.id}</div>
          <div className="embolden">{bill.name}</div>
        </div>
        <div className="inner__bill_container">
          <CardBody>
            <div className="split_between">
              <div />
              <div className="sub-text">
                {bill.created.toLocaleString("en-AU")}
              </div>
            </div>
            <div className="split_between">
              <div />
              <div className="sub-text">
                Category: {bill.category ? bill.category : "None"}
              </div>
            </div>

            <br />
            <div className="split_between">
              <div className="sub-text">Items:</div>
              <div />
            </div>
            {getItems(bill)}
            <div className="split_between">
              <div className="sub-text">Tips:</div>
              <div className="embolden">{bill.totalTip} $</div>
            </div>
            <div className="split_between">
              <div className="sub-text">Taxes:</div>
              {bill.taxes.length === 0 ? (
                <div className="embolden"> 0.00 $</div>
              ) : (
                <div className="embolden">
                  {(bill.balance - itemCost - bill.totalTip).toFixed(2)} $
                </div>
              )}
            </div>
            <div className="split_between embolden total_balance">
              <div>Total Balance</div>
              <div>{bill.balance} $</div>
            </div>
            <div className="account__icons__container">
              {bill.informationPerAccount.map((accountInfo, key) => (
                <AccountStatusIcon
                  key={key}
                  name={accountInfo.account.firstName}
                  status={accountInfo.invitationStatus}
                />
              ))}
            </div>
          </CardBody>
        </div>
      </div>
    </Card>
  );
};
export default LargeBillCard;
