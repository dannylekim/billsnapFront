import Dashboard from "./Dashboard";
import {connect} from "react-redux";
import {isUserLogged} from "../../redux/selectors/userSelectors";

const mapStateToProps = (state) => ({
  userInfo: state.users.userInfo,
  hasUser: isUserLogged(state),
  isBillLoading: state.application.isBillLoading,
});

export default connect(mapStateToProps)(Dashboard);
