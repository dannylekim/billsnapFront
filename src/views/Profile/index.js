import Profile from "./Profile";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  userInfo: state.users.userInfo,
  hasUser: Object.keys(state.users.userInfo).length > 0,
});

export default connect(mapStateToProps)(Profile);
