import Dashboard from "./Dashboard";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  userInfo: state.users.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
