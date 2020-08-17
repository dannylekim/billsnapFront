import BillSummary from './BillSummary';
import {connect} from "react-redux";
import { getTotalAmountOwe, getCountOfBills } from "../../redux/selectors/billsSelectors";


const mapStateToProps = (state) => ({
    billCount: getCountOfBills(state),
    amountToOwe: getTotalAmountOwe(state),
    activeBill: state.bills.activeBill,
  });

export default connect(mapStateToProps)(BillSummary);