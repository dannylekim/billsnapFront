import BillDisplay from "./BillDisplay.jsx";

import {connect} from "react-redux";
import {fetchMyBills, orderAlphabetical, setActiveBill, fetchPendingBills} from "../../redux/actions/billActions";
import { getActiveBills } from "../../redux/selectors/billsSelectors";

const mapStateToProps = (state) => ({
  pendingBills: state.bills.pendingBills,
  bills: getActiveBills(state),
  isBillLoading: state.application.isBillLoading,
  activeBillId: state.bills.activeBill.id,
  searchInput: state.bills.searchInput,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBills: (queryParam = "") => dispatch(fetchMyBills(queryParam)),
  fetchPendingBills: (queryParam) => dispatch(fetchPendingBills(queryParam)),
  orderAlphabetical: (alphabeticalType, bills) =>
    dispatch(orderAlphabetical(alphabeticalType, bills)),
  setActiveBill: (bill) => dispatch(setActiveBill(bill))
});

export default connect(mapStateToProps, mapDispatchToProps)(BillDisplay);
