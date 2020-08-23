import Profile from "./Profile";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  userInfo: state.users.userInfo,
});

export default connect(mapStateToProps)(Profile);
