import React from 'react';
import './styles.scss';

const BillCard = ({selectedBill}) =>
    <div  className="large__bill">
        {
        // `Bill #  ${selectedBill.bill !== null ? selectedBill.id + " " + selectedBill.bill.name : ""}`
            `Bill ${selectedBill.name} ${selectedBill.created}`
        }
        <div className="inner__bill_container">
            {JSON.stringify(selectedBill)}
        </div>
    </div>

export default BillCard;