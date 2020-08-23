import PendingBillsContainer from "./PendingBillsContainer";
import {connect} from "react-redux";
import {updatePendingBill} from "../../redux/actions/billActions";

const mapDispatchToProps = (dispatch) => ({
  updatePendingBill: (isAccepted, billId) =>
    dispatch(updatePendingBill(isAccepted, billId)),
});

const mapStateToProps = (state) => ({
  pendingBills: state.bills.bills,
  isBillLoading: state.application.isBillLoading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingBillsContainer);