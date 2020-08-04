import BillDisplay from "./BillDisplay.jsx";

import {connect} from "react-redux";
import {fetchMyBills, orderAlphabetical,} from "../../redux/actions/billActions";

const mapStateToProps = (state) => ({
  count: state.bills.count,
  bills: state.bills.bills,
  isBillLoading: state.application.isBillLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBills: (queryParam = "") => dispatch(fetchMyBills(queryParam)),
  orderAlphabetical: (alphabeticalType, bills) =>
    dispatch(orderAlphabetical(alphabeticalType, bills)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillDisplay);
