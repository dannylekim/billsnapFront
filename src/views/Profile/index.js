import Profile from "./Profile";
import {connect} from "react-redux";
import {getHasUser} from "../../redux/selectors/userSelectors";

const mapStateToProps = (state) => ({
  userInfo: state.users.userInfo,
  hasUser: getHasUser(state),
});

export default connect(mapStateToProps)(Profile);
