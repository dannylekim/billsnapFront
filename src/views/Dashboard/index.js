import Dashboard from "./Dashboard";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  userInfo: state.users.userInfo,
  hasUser: Object.keys(state.users.userInfo).length > 0 ? true : false,
  isBillLoading: state.application.isBillLoading,
});

export default connect(mapStateToProps)(Dashboard);
