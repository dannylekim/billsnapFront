import Dashboard from "./Dashboard";
import {connect} from "react-redux";
import {getHasUser} from "../../redux/selectors/userSelectors";

const mapStateToProps = (state) => ({
  userInfo: state.users.userInfo,
  hasUser: getHasUser(state),
  isBillLoading: state.application.isBillLoading,
});

export default connect(mapStateToProps)(Dashboard);
