import React, { Component } from "react";

import './styles.scss';

class BillSummary extends Component {
  render() {
    const { billCount, activeBill, amountToOwe } = this.props;

    return (
      <div className='bill__summary'>
        {activeBill && activeBill.id ? (
          <>
            <h5>
              Split by : {activeBill.responsible.firstName} {activeBill.responsible.lastName}
            </h5>
            <h5>Status : {activeBill.status}</h5>
            <h5>
              Amount Owed :
              <span id='amount__owed'> {activeBill.balance} $</span>{" "}
            </h5>
          </>
        ) : (
          <>
            <h5>
              Total Amount Owed :
              <span id='amount__owed'> {amountToOwe} $</span>
            </h5>
            <h5> Total of bills : {billCount} </h5>
          </>
        )}
      </div>
    );
  }
}

export default BillSummary;
