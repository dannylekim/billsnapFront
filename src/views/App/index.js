import App from "./App.jsx";
import {connect} from "react-redux";
import {loadUser} from "../../redux/actions/userActions";

const mapStateToProps = (state) => ({
    isLoggedIn: Object.keys(state.users.userInfo).length > 0
});

const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(loadUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
