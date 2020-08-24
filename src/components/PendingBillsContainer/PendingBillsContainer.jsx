import React, {Component} from "react";
import {PendingBillCard} from "../PendingBillCard/PendingBillCard";
import {filterDateTime} from "../../helpers/DateTime";
import Loader from "../Loader/Loader";
import "./styles.scss";

class PendingBillsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAnswerBill = this.handleAnswerBill.bind(this);
  }

  componentDidMount = async () => {
    await this.props.fetchPendingBills();
  };

  handleAnswerBill(isAccepted, billId) {
    this.props.updatePendingBill(isAccepted, billId);
  }

  render() {
    const {
      pendingBills,
      activeBillId,
      setActiveBill,
      isBillLoading,
    } = this.props;

    const PendingBillsList = (pendingBillsList) => {
      return (
        <div className="bill__container">
          {pendingBillsList.length > 0 ? (
            pendingBillsList.map((pendingBill, key) => (
              <div key={pendingBill.id}>
                <PendingBillCard
                  filterDateHandler={filterDateTime}
                  declineBillInvitationHandler={() =>
                    this.handleAnswerBill(false, pendingBill.id)
                  }
                  acceptBillInvitationHandler={() =>
                    this.handleAnswerBill(true, pendingBill.id)
                  }
                  activeBillHandler={setActiveBill}
                  activeBillId={activeBillId}
                  bill={pendingBill}
                />
                {key !== pendingBillsList.length - 1 && (
                  <hr className="card__separator" />
                )}
              </div>
            ))
          ) : (
            <p> {`No bills found titled: ${this.props.searchInput}`}</p>
          )}
        </div>
      );
    };

    return (
      <>
        {isBillLoading ? (
          <Loader />
        ) : pendingBills.length > 0 ? (
          PendingBillsList(pendingBills)
        ) : (
          <p> No Bills Found</p>
        )}
      </>
    );
  }
}

export default PendingBillsContainer;
