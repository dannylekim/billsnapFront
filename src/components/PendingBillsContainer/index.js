import PendingBillsContainer from "./PendingBillsContainer";
import {connect} from "react-redux";
import {fetchPendingBills, setActiveBill, updatePendingBill,} from "../../redux/actions/billActions";
import {getActivePendingBills} from "../../redux/selectors/billsSelectors";

const mapStateToProps = (state) => ({
  pendingBills: getActivePendingBills(state),
  isBillLoading: state.application.isBillLoading,
  activeBillId: state.bills.activeBill.id,
  searchInput: state.bills.searchInput,
});

const mapDispatchToProps = (dispatch) => ({
  updatePendingBill: (isAccepted, billId) =>
    dispatch(updatePendingBill(isAccepted, billId)),
  fetchPendingBills: (queryParam) => dispatch(fetchPendingBills(queryParam)),
  setActiveBill: (bill) => dispatch(setActiveBill(bill)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingBillsContainer);
