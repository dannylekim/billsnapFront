import {connect} from "react-redux";
import Dashboard from "./Dashboard";

const mapStateToProps = (state) => ({
  activeBill:
    Object.keys(state.bills.activeBill).length > 0
      ? state.bills.activeBill
      : undefined,
});

export default connect(mapStateToProps, null)(Dashboard);
