import App from "./App.jsx";
import {connect} from "react-redux";
import {loadUser} from "../../redux/actions/userActions";
import {isUserLogged} from "../../redux/selectors/userSelectors";

const mapStateToProps = (state) => ({
    isLoggedIn: isUserLogged(state)
});

const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(loadUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
