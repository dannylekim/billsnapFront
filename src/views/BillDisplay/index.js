import BillDisplay from "./BillDisplay.jsx";

import {connect} from "react-redux";
import {fetchMyBills, setActiveBill} from "../../redux/actions/billActions";
import {getActiveBills} from "../../redux/selectors/billsSelectors";

const mapStateToProps = (state) => ({
  bills: getActiveBills(state),
  isBillLoading: state.application.isBillLoading,
  activeBillId: state.bills.activeBill.id,
  searchInput: state.bills.searchInput,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBills: (queryParam = "") => dispatch(fetchMyBills(queryParam)),
  setActiveBill: (bill) => dispatch(setActiveBill(bill))
});

export default connect(mapStateToProps, mapDispatchToProps)(BillDisplay);
