import React, {Component} from "react";
import PayBill from "../PayBill";
import {Button, Modal, ModalBody, ModalHeader} from "shards-react";
import {MdPayment} from "react-icons/md"

class PayBillContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amountRemaining: this.props.bill.amountOwed,
            isOpen: false
        };

        this.payBillHandler = this.payBillHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

    };

    onChangeHandler = (event) => {
        const {name, value} = event.target;
        this.setState(
            (prev) => ({
                ...prev,
                [name]: value
            })
        );
    };
    toggleModal = () => {
        this.setState(
            (prev) => ({
                ...prev,
                isOpen: !this.state.isOpen,
            })
        )
    };

    payBillHandler = () => {
        this.props.payABill(this.state.amountRemaining, this.props.bill.id);
        this.toggleModal();
    }

    render() {
        return (
            <div>
                <Button theme="success" size="sm" pill onClick={this.toggleModal}> <MdPayment/> Pay Bill </Button>
                <Modal size="sm" open={this.state.isOpen} toggle={this.toggleModal}>
                    <ModalHeader>
                        Payment Detail
                    </ModalHeader>
                    <ModalBody>
                        <PayBill
                            payBillHandler={this.payBillHandler}
                            onChangeHandler={this.onChangeHandler}
                            billName={this.props.bill.name}
                            amountRemainingToPay={this.state.amountRemaining}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

export default PayBillContainer
