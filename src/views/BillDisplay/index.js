import BillDisplay from "./BillDisplay.jsx";

import {connect} from "react-redux";
import {fetchMyBills, orderAlphabetical, setActiveBill} from "../../redux/actions/billActions";
import { getActiveBills } from "../../redux/selectors/billsSelectors";

const mapStateToProps = (state) => ({
  bills: getActiveBills(state),
  isBillLoading: state.application.isBillLoading,
  activeBillId: state.bills.activeBill.id,
  searchInput: state.bills.searchInput,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBills: (queryParam = "") => dispatch(fetchMyBills(queryParam)),
  orderAlphabetical: (alphabeticalType, bills) =>
    dispatch(orderAlphabetical(alphabeticalType, bills)),
  setActiveBill: (bill) => dispatch(setActiveBill(bill))
});

export default connect(mapStateToProps, mapDispatchToProps)(BillDisplay);
