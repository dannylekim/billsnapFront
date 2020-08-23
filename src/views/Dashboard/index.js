import Dashboard from "./Dashboard";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  userInfo: state.users.userInfo,
  isBillLoading: state.application.isBillLoading,
});

export default connect(mapStateToProps)(Dashboard);
