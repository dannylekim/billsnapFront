import React, { Component } from "react";
import "./styles.scss";
import Loader from "../../components/Loader";

class BillDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { firstName: "", lastName: "" },
    };
  }

  componentDidMount = async () => {
    await this.props.fetchBills();
  };

  static billStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "success";
      case "RESOLVED":
        return "primary";
      case "IN_PROGRESS":
        return "warning";
      default:
        return "muted";
    }
  };

  render = () => {
    const BillsList = (bills) => (
      <section>
        <h1> Bills </h1>
        <div className="bill__container">
          {bills.map((bill, key) => (
            <div key={key} className="bill__card card">
              <div className="card-body">
                <h5 className="card-title">{bill.name}</h5>
                <ul className="bill__list list-group card-text">
                  <li
                    className={`bill__list__item list-group-item list-group-item-${this.constructor.billStatusColor(
                      bill.status
                    )}`}
                  >
                    Bill Status: {bill.status}
                  </li>
                  <li className="bill__list__item list-group-item">
                    Bill category: {bill.category}
                  </li>
                  <li className="bill__list__item list-group-item">
                    Bill balance: ${bill.balance}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    );

    const { bills, isBillLoading } = this.props;
    return (
      <div className="bill__wrapper">
        {isBillLoading ? (
          <Loader />
        ) : bills.length > 0 ? (
          BillsList(bills)
        ) : (
          <p> No Bills Found</p>
        )}
      </div>
    );
  };
}

export default BillDisplay;
