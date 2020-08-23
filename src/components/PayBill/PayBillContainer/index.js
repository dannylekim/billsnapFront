import PayBillContainer from "./PayBillContainer";
import {connect} from "react-redux";
import {payABill} from "../../../redux/actions/billActions"

const mapDispatchToProps = (dispatch) => ({
    payABill: (amountPaid, billId) => dispatch(payABill(amountPaid, billId)),
});

export default connect(null, mapDispatchToProps)(PayBillContainer);
