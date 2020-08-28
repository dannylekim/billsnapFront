import Profile from "./Profile";
import {connect} from "react-redux";
import {isUserLogged} from "../../redux/selectors/userSelectors";

const mapStateToProps = (state) => ({
  userInfo: state.users.userInfo,
  hasUser: isUserLogged(state),
});

export default connect(mapStateToProps)(Profile);
