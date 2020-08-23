import React, {Component} from "react";
import {PendingBillCard} from "../PendingBillCard/PendingBillCard";
import {filterDateTime} from "../../utils/DateUtils";

class PendingBillsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAnswerBill = this.handleAnswerBill.bind(this);
  }

  handleAnswerBill(isAccepted, billId) {
    this.props.updatePendingBill(isAccepted, billId);
  }

  render() {
    const { pendingBill, activeBillId } = this.props;

    return (
      <PendingBillCard
        filterDateHandler={filterDateTime}
        declineBillInvitationHandler={() =>
          this.handleAnswerBill(false, pendingBill.id)
        }
        acceptBillInvitationHandler={() =>
          this.handleAnswerBill(true, pendingBill.id)
        }
        activeBillId={activeBillId}
        bill={pendingBill}
      />
    );
  }
}

export default PendingBillsContainer;
