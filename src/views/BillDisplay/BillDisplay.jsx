import React, {Component} from "react";

import Loader from "../../components/Loader";
import SmallBillCard from "../../components/BillCard/SmallBillCard";

import "./styles.scss";

class BillDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seachedQuery: "",
      selectedBill: { bill: null, id: 0 },
      currentActiveTab: "allBills",
      sorting: { opened: false, type: "Newest" },
      filter: {
        opened: false,
        type: "",
        statusOpened: false,
        categoryOpened: false,
        dateOpened: false,
      },
      dateFilters: {
        startDate: { selected: false, value: "" },
        endDate: { selected: false, value: "" },
      },
      billStatusFilter: { resolved: false, open: false, in_progess: false },
    };
  }

  componentDidMount = async () => {
    await this.props.fetchBills();
  };

  render = () => {
    const { bills, isBillLoading, count } = this.props;

    /**
     * @description returns the list of bills as cards.
     * @param {Array} billsVar the variable bills,
     */
    const BillsList = (billsVar) => {
    //   billsVar =
    //     this.state.seachedQuery.trim() !== ""
    //       ? billsVar.filter((bill) =>
    //           bill.name.includes(this.state.seachedQuery)
    //         )
    //       : billsVar;

      return (
        <div className="bill__container">
          {billsVar.length > 0 ? (
            billsVar.map((bill, key) => (
              <div
                className="bill__card card"
                key={bill.id}
                onClick={() =>
                  this.setState({ selectedBill: { bill, id: bill.id } })
                }
              >
                <SmallBillCard
                  activeBill={this.state.selectedBill.bill}
                  bill={bill}
                />
                {key !== billsVar.length - 1 && (
                  <hr className="card__seperator" />
                )}
              </div>
            ))
          ) : (
            <p> {`No bills found titled: ${this.state.seachedQuery}`}</p>
          )}
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
