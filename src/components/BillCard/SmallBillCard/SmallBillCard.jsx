import React from 'react';
import './styles.scss';

const SmallBillCard = ({bill,filterDateTime,billIcons}) => 
    <div className="bill__items card-body">
        {bill.created && 
        <div className="bill__items card-title text-muted">
            <span className = "float-right" id="bill__created"> {filterDateTime(bill.created)}</span>
        </div>
        }
        <div className="bill__items card-text">
            <div id="bill__icon">{billIcons(bill.category)}</div>  
            <div className="bill__name__price">
                <span id="bill__name">{bill.name} </span>
                <span id="bill__balance"> {parseFloat(bill.balance).toFixed(2)} $  </span>
            </div>
        </div>
    </div>
export default SmallBillCard