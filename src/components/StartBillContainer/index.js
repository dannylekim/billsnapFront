import {startABill} from "../../redux/actions/billActions";
import {connect} from "react-redux";
import StartBillContainer from "./StartBillContainer";

const mapStateToProps = (state) => ({
  isBillLoading: state.application.isBillLoading,
  // activeBillId: state.bills.activeBill.id,
  // billResponsibleEmail: state.bills.activeBill.responsible.email,
  userEmail: state.users.userInfo.email
});

const mapDispatchToProps = (dispatch) => ({
  startABill: billId => dispatch(startABill(billId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartBillContainer);
