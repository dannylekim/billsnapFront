import React, {Component} from "react";
import "./styles.scss";
import Loader from "../Loader/Loader";
import StartBillButton from "../StartBillButton/StartBillButton";

class StartBillContainer extends Component {
    constructor(props) {
        super(props);
        this.handleStartBill = this.handleStartBill.bind(this);
    }

    handleStartBill(billId) {
        this.props.startABill(billId);
    }

    userIsBillResponsible() {
        return this.props.userEmail === this.props.bill.responsible.email;
    }

    render() {
        const {
            activeBillId,
            isBillLoading
        } = this.props;

        const StartActiveBill = billId => {
            return (
                <div className="button__container">
                    <StartBillButton onClick={this.handleStartBill(billId)}></StartBillButton>
                </div>
            )
        }

        const displayStartBillButton = this.userIsBillResponsible() ? (StartActiveBill(activeBillId)) : (<div/>);

        return <>{isBillLoading ? <Loader/> : displayStartBillButton}</>;
    }

}

export default StartBillContainer;
