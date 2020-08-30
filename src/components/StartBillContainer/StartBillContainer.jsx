import React, {Component} from "react";
import "./styles.scss";
import StartBillButton from "../StartBillButton/StartBillButton";

class StartBillContainer extends Component {
    constructor(props) {
        super(props);
        this.handleStartBill = this.handleStartBill.bind(this);
    }

    handleStartBill(billId) {
        this.props.startABill(billId);
    }

    billCanBeStarted() {
        return this.props.userEmail === this.props.bill.responsible.email
            && this.props.bill.status === "OPEN";
    }

    render() {
        const {bill} = this.props;

        const StartActiveBill = billId => {
            return (
                <div className="button__container">
                    <StartBillButton onClickHandler={() => this.handleStartBill(billId)}/>
                </div>
            )
        }

        const displayStartBillButton = this.billCanBeStarted() ? (StartActiveBill(bill.id)) : (<div/>);

        return <>{displayStartBillButton}</>;
    }

}

export default StartBillContainer;
