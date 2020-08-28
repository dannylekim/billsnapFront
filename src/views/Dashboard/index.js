import {connect} from "react-redux";
import Dashboard from "./Dashboard";
import {isUserLogged} from "../../redux/selectors/userSelectors";

const mapStateToProps = (state) => ({
  hasUser: isUserLogged(state),
  isActiveBillLoading: state.application.isActiveBillLoading,
  activeBill:
    Object.keys(state.bills.activeBill).length > 0
      ? state.bills.activeBill
      : undefined,
});

export default connect(mapStateToProps, null)(Dashboard);
