import React, {PureComponent} from "react";
import './styles.scss';
import { getBill } from "../../utils/requests/BillRequests";
import loading from "./gif/loading.gif" //temp loader gif

class BillDisplay extends PureComponent {

    state = {   user:   { firstName:  "",
                        lastName: ""
                },
                bills:  [],
                billsLoaded: false  
                        
    };

    /**
     * @description calls the getBill function to get all bills for a user, then sets the bills states.
     */
    fetchBill = async () => {
                            const bills =  await getBill();
                            this.setState({...this.state, bills, billsLoaded: true})
    };

    componentDidMount = async () => {
                            await this.fetchBill();
    };

    billStatusColor = status => {
        switch(status){
            case "OPEN":
                return "success";
            case "RESOLVED":
                return "primary";
            case "IN_PROGRESS":
                return "warning";
            default:
                return "muted";   
        };
    };
   
    render = () => {
        
    const BillsList = (bills) => (
        <section>
            <h1> Bills </h1>
            <div className="bill__container">
                { bills.map((bill,key) =>
                    <div key={key} className="bill__card card">
                        <div className="card-body">
                            <h5 className="card-title">{bill.name}</h5>
                            <ul className="bill__list list-group card-text">
                                <li className={`bill__list__item list-group-item list-group-item-${this.billStatusColor(bill.status)}` }>Bill Status: {bill.status}</li>
                                <li className="bill__list__item list-group-item">Bill category: {bill.category}</li>
                                <li className="bill__list__item list-group-item">Bill balance: ${bill.balance}</li>
                            </ul>
                        </div>
                    </div>)
                }   
            </div>
        </section>
    );

    const {bills,billsLoaded} = this.state;
        return (
            <div className="bill__wrapper"> 
                {!billsLoaded ? 
                <div className="bill__loading">
                    <img src= {loading} alt="loading gif" className="loading__gif"/>
                </div>
                : 
                bills.length > 0  ? 
                    BillsList(bills)
                :
                    <p> No Bills Found</p>
                }
            </div>
        );
    };
};

export default BillDisplay

