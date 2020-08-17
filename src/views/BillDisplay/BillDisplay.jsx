import React, {Component} from "react";

import Loader from "../../components/Loader";
import SmallBillCard from "../../components/BillCard/SmallBillCard";

import "./styles.scss";

class BillDisplay extends Component {
  componentDidMount = async () => {
    await this.props.fetchBills();
  };

  render = () => {
    const { bills, isBillLoading } = this.props;

    /**
     * @description returns the list of bills as cards.
     * @param {Array} billsVar the variable bills,
     */
    const BillsList = (billsVar) => {
      return (
        <div className="bill__container">
          {
            billsVar.map((bill, key) => (
              <div
                className="bill__card card"
                key={bill.id}
                onClick={() =>
                  this.props.setActiveBill(bill)
                }
              >
                <SmallBillCard
                  activeBillId={this.props.activeBillId}
                  bill={bill}
                />
                {key !== billsVar.length - 1 && (
                  <hr className="card__seperator" />
                )}
              </div>
            ))
          }
        </div>
      );
    };
    
    return (
      <>
        {isBillLoading ? (
          <Loader />
        ) : bills.length > 0 ? (
            BillsList(bills)
        ) : (
          <p> No Bills Found</p>
        )}
      </>
    );
  };
}

export default BillDisplay;
