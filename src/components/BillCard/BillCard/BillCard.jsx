import React from 'react';
import './styles.scss';

const BillCard = ({selectedBill}) =>
    <div  className="bill__card">
        {
        `Bill #  ${selectedBill.bill !== null ? selectedBill.id + " " + selectedBill.bill.name : ""}`
        }
        <div className="inner__bill_container">
        </div>
    </div> 
export default BillCard;