import CreateBillFormContainer from "./CreateBillFormContainer";
import {connect} from "react-redux";
import {createNewBill} from "../../redux/actions/billActions";

const mapDispatchToProps = (dispatch) => ({
  createNewBill: (createBillParam) => dispatch(createNewBill(createBillParam)),
});

export default connect(null, mapDispatchToProps)(CreateBillFormContainer);
