import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {setUser} from "../../redux/actions/userActions";

const mapDispatchToProps = (dispatch) => ({
  setUser: (user = {}) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
