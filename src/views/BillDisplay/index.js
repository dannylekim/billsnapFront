import BillDisplay from './BillDisplay.jsx';

import {connect} from 'react-redux'
// import { setBillLoading } from '../../redux/actions/applicationActions';
import {fetchMyBills, orderAlphabetical} from '../../redux/actions/billActions';


const mapStateToProps = (state) => ({
    count: state.bills.count,
    bills: state.bills.bills,
    isBillLoading: state.application.isBillLoading
})

const mapDispatchToProps = (dispatch) => ({
    // beginBillLoading: () => dispatch(setBillLoading(true)),
    // finishBillLoading: () => dispatch(setBillLoading(false)),
    fetchBills: (query_param = "") => dispatch(fetchMyBills(query_param)),
    orderAlphabetical: (alphabeticalType, bills) => dispatch(orderAlphabetical(alphabeticalType, bills)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BillDisplay);