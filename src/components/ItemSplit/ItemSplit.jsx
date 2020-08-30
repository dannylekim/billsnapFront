import React from "react";
import {CardBody, Progress} from "shards-react";
import AccountStatusIcon from "../AccountStatusIcon";
import "./styles.scss";

function getItemSplit(itemInformation) {
  return (
    <>
      {itemInformation.accounts.map((accountItem, key) => {
        const itemCostByPercentage =
          itemInformation.cost * (accountItem.percentage / 100);
        return (
          <div key={key} className="one__liner">
            <AccountStatusIcon
              status={accountItem.status}
              name={accountItem.firstName}
            />
            <div className="grow__line">
              <div className="center">{itemCostByPercentage.toFixed(2)} $</div>
              <Progress theme="success" value={accountItem.percentage}>
                {accountItem.percentage} %
              </Progress>
            </div>
          </div>
        );
      })}
    </>
  );
}

const ItemSplit = ({ itemInformation }) => {
  return (
    <CardBody className="modal__text modal__body">
      <div>
        Item: <span className="embolden"> {itemInformation.name} </span>
      </div>
      <div>Total: {itemInformation.cost} $</div>
      <hr className="card__separator" />
      <div>Shared between:</div>
      {getItemSplit(itemInformation)}
    </CardBody>
  );
};

export default ItemSplit;
