import BillDisplay from './BillDisplay.jsx';

import { connect } from 'react-redux'
import { setBillLoading } from '../../redux/actions/applicationActions';
import { fetchMyBills } from '../../redux/actions/billActions';



const mapStateToProps = (state) => ({
    bills: state.bills.bills,
    isBillLoading: state.application.isBillLoading
})

const mapDispatchToProps = (dispatch) => ({
    beginBillLoading: () => dispatch(setBillLoading(true)),
    finishBillLoading: () => dispatch(setBillLoading(false)),
    fetchBills: () => dispatch(fetchMyBills()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BillDisplay);